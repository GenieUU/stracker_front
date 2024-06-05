from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import mediapipe as mp
import base64
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # 모든 경로에서 모든 도메인의 요청 허용

# Mediapipe 초기화
mp_face_mesh = mp.solutions.face_mesh
mp_drawing = mp.solutions.drawing_utils

# EAR 계산 함수
def eye_aspect_ratio(landmarks, eye_indices):
    eye = np.array([landmarks[i] for i in eye_indices])
    A = np.linalg.norm(eye[1] - eye[5])
    B = np.linalg.norm(eye[2] - eye[4])
    C = np.linalg.norm(eye[0] - eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

# 얼굴 방향 추정 함수
def estimate_head_pose(landmarks):
    left_eye = np.mean([landmarks[i] for i in LEFT_EYE_INDICES], axis=0)
    right_eye = np.mean([landmarks[i] for i in RIGHT_EYE_INDICES], axis=0)
    nose = landmarks[1]

    horizontal_dist = np.linalg.norm(left_eye - right_eye)
    vertical_dist = np.linalg.norm(nose - (left_eye + right_eye) / 2)
    
    return horizontal_dist, vertical_dist

# 눈 랜드마크 인덱스
LEFT_EYE_INDICES = [33, 160, 158, 133, 153, 144]
RIGHT_EYE_INDICES = [263, 387, 385, 362, 380, 373]

# 기본 임계값 설정
EYE_AR_THRESH = 0.18
EYE_AR_CONSEC_FRAMES = 3

sleep_start_time = None

@app.route('/')
def index():
    return "Welcome to the Eye Detection Service"

@app.route('/predict', methods=['POST'])
def predict():
    global sleep_start_time
    data = request.json
    frame_data = base64.b64decode(data['frame'].split(',')[1])
    np_arr = np.frombuffer(frame_data, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    heart_rate = data.get('heartRate', None)

    with mp_face_mesh.FaceMesh(
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5) as face_mesh:

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(frame_rgb)

        if results.multi_face_landmarks:
            face_landmarks = results.multi_face_landmarks[0].landmark
            h, w, _ = frame.shape
            landmarks = [(int(pt.x * w), int(pt.y * h)) for pt in face_landmarks]

            # 얼굴 방향 추정
            horizontal_dist, vertical_dist = estimate_head_pose(landmarks)
            direction = "전면"

            # EAR 계산
            left_ear = eye_aspect_ratio(landmarks, LEFT_EYE_INDICES)
            right_ear = eye_aspect_ratio(landmarks, RIGHT_EYE_INDICES)
            ear = (left_ear + right_ear) / 2.0

            # 얼굴 방향에 따른 임계값 조정
            if horizontal_dist < vertical_dist:  # 옆모습
                adjusted_eye_ar_thresh = EYE_AR_THRESH
                one_eye_closed = left_ear < EYE_AR_THRESH or right_ear < EYE_AR_THRESH
                direction = "옆"
            elif vertical_dist < horizontal_dist * 0.5:  # 아래를 보는 경우
                adjusted_eye_ar_thresh = 0.15
                one_eye_closed = ear < adjusted_eye_ar_thresh
                direction = "아래"
            else:  # 정면
                adjusted_eye_ar_thresh = EYE_AR_THRESH
                one_eye_closed = ear < adjusted_eye_ar_thresh
                direction = "옆"

            # EAR 값 기반으로 눈 상태 판단
            if one_eye_closed:
                ear_label = "Closed"
            else:
                ear_label = "Open"

            if ear_label == 'Closed':
                if sleep_start_time is None:
                    sleep_start_time = time.time()
                elapsed_time = time.time() - sleep_start_time
                if elapsed_time > 120:
                    if heart_rate is not None and int(heart_rate) <= 50:
                        is_sleeping = True
                    else:
                        is_sleeping = elapsed_time > 120
                else:
                    is_sleeping = False
            else:
                sleep_start_time = None
                is_sleeping = False

            result = {
                'isSleeping': is_sleeping,
                'ear_label': ear_label
            }
        else:
            result = {
                'isSleeping': False,
                'ear_label': "얼굴이 없어요:("
            }

        return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

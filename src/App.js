import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SignUp from './Signup'; 
import Sidebar from './Sidebar';
import logo from './_logo.png';
import HeartRatePicture from './_HeartRatePicture.png';
import ConcentrationValueTri from './_ConcentrationValueTri.png';
import './Sidebar.css';

const App = () => {
  const [sideBarVisible, setSidebarVisible] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [heartRate, setHeartRate] = useState('--');  // 심박수 상태 추가
  const [status, setStatus] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [eyeState, setEyeState] = useState('깨어 있음');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 오늘 날짜 넣기
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setCurrentDate(formattedDate);
  }, []);

  const connectStart = () => {
    console.log('Start');
    setIsConnecting(true);
  
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsConnected(true); // 웹캠 연결 상태 업데이트
          setIsConnecting(false); // 연결 중 상태 업데이트
          processFrame(); // 웹캠이 켜진 후 프레임 처리 시작
        })
        .catch((err) => {
          console.error('Error accessing webcam: ', err);
          setIsConnecting(false);
        });
    }
  };

  const processFrame = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const frame = canvas.toDataURL('image/jpeg');

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ frame }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStatus(`${data.ear_label}`);
      setEyeState(data.ear_label === 'Closed' ? '자고 있음' : '깨어 있음');
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }

    requestAnimationFrame(processFrame);
  };

  // 회원가입 페이지 보이기
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="Main">
      {showSignUp ? (
        <SignUp />  // 회원가입 페이지가 보이는 경우
      ) : (
        <>
          <div className="Background" />
          <img 
            className="Logo" 
            src={logo} 
            alt="Logo" 
          />
          <div className="CameraScreen">
            <video ref={videoRef} className="videoInput"></video>
            <canvas ref={canvasRef} className="outputCanvas"></canvas>
          </div>
          {/* 사이드바 컴포넌트 */}
          <Sidebar 
            sideBarVisible={sideBarVisible}
            toggleSidebar={() => setSidebarVisible(!sideBarVisible)}
            toggleSignUp={toggleSignUp}
            setHeartRate={setHeartRate}  // 심박수 업데이트 함수 전달
          />
          <div className="Time">
            <div className="TimerDate">{currentDate}</div>
            <div className="TimerTime">00 : 00 : 00</div>
          </div>
          <div className="Concentration">
            <div className="ConcentrationValue" />
            <img 
              className="ConcentrationValueTri"
              src={ConcentrationValueTri} 
              alt="ConcentrationValueTri" 
            />
            <div className="ConcentrationTitleBox" />
            <div className="ConcentrationTitle">현재 집중도</div>
          </div>
          <div className="HeartRate">
            <div className="HeartRateTitleBox" />
            <div className="HeartRateTitle">현재 심박수</div>
            <img 
              className="HeartRatePicture" 
              src={HeartRatePicture} 
              alt="HeartRatePicture" 
            />
            <div className="HeartRateBpm">{heartRate} BPM</div>
          </div>
          <div className="State">
            <div className="StateBox" />
            {/* 현재 상태 표시(눈을 감고 있음 : 자고 있음/눈을 뜨고 있음 : 깨어 있음) */}
            <div className="StateText">{status}</div>
            <div className="StatePicture" />
          </div>
          {!isConnected && (
            <>
              <div className="startButton" onClick={connectStart}>시 작</div>
              {isConnecting && <div className="StartText">연결 중...</div>}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;

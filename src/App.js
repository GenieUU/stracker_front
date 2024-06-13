import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SignUp from './Signup';
import Sidebar from './Sidebar';
import logo from './_logo.png';
import SideButton from './_SideButton.png';
import StateStudy from './_StateStudy.gif';
import StateSleep from './_StateSleep.gif';
import HeartRatePicture from './_HeartRatePicture.png';
import ConcentrationValueTri from './_ConcentrationValueTri.png';
import './Sidebar.css';
import { auth, db } from './firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const App = () => {
  const [sideBarVisible, setSidebarVisible] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('main');
  const [heartRate, setHeartRate] = useState('---');
  const [eyeState, setEyeState] = useState('연결 안됨');
  const [sleepCount, setSleepCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [eyeClosedTime, setEyeClosedTime] = useState(0);
  const videoRef = useRef(null);
  const [frameIntervalId, setFrameIntervalId] = useState(null);
  const timerIntervalId = useRef(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setCurrentDate(formattedDate);

    if (user) {
      syncUserData();
    }
  }, [user]);

  useEffect(() => {
    if (isStarted) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isStarted]);

  useEffect(() => {
    if (eyeClosedTime >= 120) {
      if (heartRate !== '---' && heartRate <= 45) {
        setSleepCount(prevCount => prevCount + 1);
      } else if (heartRate === '---') {
        setSleepCount(prevCount => prevCount + 1);
      }
      setEyeClosedTime(0); // 졸음 횟수 증가 후 타이머 리셋
    }
  }, [eyeClosedTime, heartRate]);

  useEffect(() => {
    if (sleepCount > 0) {
      console.log(`졸음 횟수: ${sleepCount}`);
    }
  }, [sleepCount]);

  // 데이터베이스에서 사용자 데이터 동기화
  const syncUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setElapsedTime(userData.studyTime || 0);
        setSleepCount(userData.sleepCount || 0);
        console.log(`사용자 이름: ${userData.userName}`);
        console.log(`사용자 졸음 횟수: ${userData.sleepCount}`);
        console.log(`사용자 공부 시간: ${userData.studyTime}`);
      }
    } catch (error) {
      console.error('Failed to sync user data:', error);
    }
  };

  // 하루가 지나면 시간 초기화
  const checkAndResetDailyTime = () => {
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const today = new Date().toISOString().split('T')[0];

    if (lastLoginDate !== today) {
      setElapsedTime(0);
      setSleepCount(0);
      localStorage.setItem('lastLoginDate', today);
    }
  };

  useEffect(() => {
    checkAndResetDailyTime();
  }, [currentDate]);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
    setCurrentPage('signup');
  };

  const handleUserSignUp = (userData) => {
    setUser(userData);
    setShowSignUp(false);
    setCurrentPage('main');
  };

  const handleLogOut = async () => {
    if (user) {
      try {
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
          studyTime: elapsedTime,
          sleepCount: sleepCount
        });
        await signOut(auth);
        console.log('로그아웃 성공');
      } catch (error) {
        console.error('로그아웃 실패:', error);
      }
    }
    setIsLoggedIn(false);
    setUser(null);
    setElapsedTime(0);
    setSleepCount(0);
  };

  const navigateToMain = () => {
    setCurrentPage('main');
  };

  const startTimer = () => {
    if (!timerIntervalId.current) {
      timerIntervalId.current = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerIntervalId.current) {
      clearInterval(timerIntervalId.current);
      timerIntervalId.current = null;
    }
  };

  const connectStart = () => {
    setIsStarted(true);

    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          startFrameProcessing(); // 프레임 처리 시작
        })
        .catch((err) => {
          console.error('웹캠 접근 실패: ', err);
          setIsStarted(false);
        });
    }
  };

  const startFrameProcessing = () => {
    if (!frameIntervalId) {
      const id = setInterval(processFrame, 1000); // 1초마다 프레임 처리
      setFrameIntervalId(id);
    }
  };

  const stopFrameProcessing = () => {
    if (frameIntervalId) {
      clearInterval(frameIntervalId);
      setFrameIntervalId(null);
    }
  };

  const processFrame = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const frame = canvas.toDataURL('image/jpeg');

    try {
        const response = await fetch('https://stracker-36qhz3umla-du.a.run.app/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ frame, heartRate }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.ear_label === "Closed") {
            setEyeClosedTime(prevTime => prevTime + 1);
            setEyeState('졸고 있음');
            document.querySelector('.StatePicture').src = StateSleep;
            stopTimer(); // 눈을 감고 있는 경우 타이머 멈춤
        } else if (data.ear_label === "얼굴이 없어요:(") {
            setEyeState('얼굴이 없어요:(');
            document.querySelector('.StatePicture').src = StateStudy;
            stopTimer(); // 얼굴이 없는 경우 타이머 멈춤, 졸음 횟수 증가하지 않음
        } else {
            setEyeClosedTime(0); // 눈을 뜬 경우 타이머 리셋
            setEyeState('공부중...');
            document.querySelector('.StatePicture').src = StateStudy;
            startTimer(); // 눈을 뜬 경우 타이머 시작
        }
    } catch (error) {
        console.error('Error fetching prediction:', error);
    }
  };

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="Main">
      {currentPage === 'signup' ? (
        <SignUp 
          toggleSidebar={() => setSidebarVisible(!sideBarVisible)} 
          sideBarVisible={sideBarVisible}
          navigateToMain={navigateToMain} />
      ) : (
        <>
          <div className="Background" />
          <img 
            className="Logo" 
            src={logo} 
            alt="Logo" 
            onClick={navigateToMain}
          />
          <div className="CameraScreen">
            <video ref={videoRef} className="videoInput" style={{ display: 'block' }} />
          </div>
          <img
            className="SideButton"
            src={SideButton}
            alt="SideButton"
            onClick={() => setSidebarVisible(!sideBarVisible)}
          />
          <Sidebar 
            sideBarVisible={sideBarVisible}
            toggleSidebar={() => setSidebarVisible(!sideBarVisible)}
            toggleSignUp={toggleSignUp}
            user={user}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            handleLogOut={handleLogOut}
            setHeartRate={setHeartRate}
            setElapsedTime={setElapsedTime} // elapsedTime 업데이트 함수 전달
            setSleepCount={setSleepCount}   // sleepCount 업데이트 함수 전달
            setUser={setUser}               // setUser 함수 전달
            elapsedTime={elapsedTime}       // elapsedTime 값 전달
            sleepCount={sleepCount}         // sleepCount 값 전달
          />
          <div className="Time">
            <div className="TimerDate">{currentDate}</div>
            <div className="TimerTime">{formatTime(elapsedTime)}</div>
          </div>
          <div className="State">
            <div className="StateBox" />
            <div className="StateText">{eyeState}</div>
            <img 
              className="StatePicture" 
              src={StateStudy} 
              alt="StateStudy" 
            />
          </div>
          <div className="Concentration">
            <div className="ConcentrationValue" />
            <img 
              className="ConcentrationValueTri"
              src={ConcentrationValueTri} 
              alt="ConcentrationValueTri" 
            />
            <div className="ConcentrationTitleBox">
              <div className="ConcentrationTitle">현재 집중도</div>
            </div>
          </div>
          <div className="HeartRate">
            <div className="HeartRateTitleBox">
              <div className="HeartRateTitle">현재 심박수</div>
            </div>
            <img 
              className="HeartRatePicture" 
              src={HeartRatePicture} 
              alt="HeartRatePicture" 
            />
            <div className="HeartRateBpm">{heartRate} BPM</div>
          </div>
          {!isStarted && (
            <div className="startButton" onClick={connectStart}>
              <div className="StartText">시 작</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

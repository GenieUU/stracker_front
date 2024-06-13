import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SignUp from './Signup';
import Sidebar from './Sidebar';
import logo from './_logo.png';
import SideButton from './_SideButton.png';
import StateStudy from './_StateLoading.gif'; //상태gif-로딩중
//import StateStudy from './_StateStudy.gif'; //상태gif-공부중
//import StateStudy from './_StateSleep.gif'; //상태gif-조는중
//import StateStudy from './_StateNoFace.gif'; //상태gif-얼굴없음
import UnderPlay from './_UnderPlay.png';
import UnderPause from './_UnderPause.png';
import UnderReset from './_UnderReset.png';
import HeartRatePicture from './_HeartRatePicture.png';
import SleepCountPicture from './_SleepCountPicture.png';
//import ConcentrationValueTri from './_ConcentrationValueTri.png'; // 집중도 그래프 화살표
import './Sidebar.css';

const App = () => {
  const [sideBarVisible, setSidebarVisible] = useState(false); // 사이드바 보이기 여부
  const [isStarted, setIsStarted] = useState(false); // 사직 버튼 보이기 여부
  const [showSignUp, setShowSignUp] = useState(false); // 회원가입 페이지 정보
  const [currentDate, setCurrentDate] = useState(''); // 현재 날짜 정보
  const [user, setUser] = useState(null); // 사용자 정보
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const [currentPage, setCurrentPage] = useState('main'); // 현재 페이지 정보(메인 페이지, 회원가입 페이지)
  const [timerTime, setTimerTime] = useState(0); // 타이머 시간 (초 단위)
  const timerRef = useRef(null); // 타이머 참조

  // 오늘 날짜 넣기
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setCurrentDate(formattedDate);
  }, []);

  // Start 연결 시도 함수
  const connectStart = () => {
    console.log('Start');
    setIsStarted(true); 
  };

  // 회원가입 페이지 보이기
  const toggleSignUp = () => {
    setShowSignUp(true);
        setCurrentPage('signup');
        setSidebarVisible(false);
  };

  // 로그아웃
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // 현재 페이지 정보
  const navigateToMain = () => {
    setCurrentPage('main');
    setSidebarVisible(false);
  };

   // 타이머 시작
   const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimerTime(prevTime => prevTime + 1);
      }, 1000);
    }
  };

  // 타이머 일시정지
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // 타이머 리셋
  const resetTimer = () => {
    pauseTimer();
    setTimerTime(0);
  };

  // 타이머 시간 형식화
  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours} : ${minutes} : ${seconds}`;
  };

  return (
    <div className="Main">
      {currentPage === 'signup' ? (
        <SignUp 
          toggleSidebar={() => setSidebarVisible(!sideBarVisible)} 
          sideBarVisible={sideBarVisible}
          navigateToMain={navigateToMain} 
          toggleSignUp={toggleSignUp} />
      ) : (
        <>
          <div className="Background" />
          <img 
            className="Logo" 
            src={logo} 
            alt="Logo" 
            onClick={navigateToMain}
          />
          <div className="CameraScreen" />
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
          />
          <div className="Time">
            <div className="TimerDate">{currentDate}</div>
            <div className="TimerTime">{formatTime(timerTime)}</div>
          </div>
          <div className="State">
            <div className="StateBox" />
            <div className="StateText">깨어 있음</div>
            <img 
              className="StatePicture" 
              src={StateStudy} 
              alt="StateStudy" 
            />
          </div>
          {/*<div className="Concentration">
            <div className="ConcentrationValue" />
            <img 
              className="ConcentrationValueTri"
              src={ConcentrationValueTri} 
              alt="ConcentrationValueTri" 
            />
            <div className="ConcentrationTitleBox">
              <div className="ConcentrationTitle">현재 집중도</div>
            </div>
          </div>*/}
          <div className="HeartRate">
            <div className="HeartRateTitleBox">
              <div className="HeartRateTitle">현재 심박수</div>
            </div>
            <img 
              className="HeartRatePicture" 
              src={HeartRatePicture} 
              alt="HeartRatePicture" 
            />
            <div className="HeartRateBpm"> -- BPM</div>
          </div>
          <div className="SleepCount">
            <div className="SleepCountTitleBox">
              <div className="SleepCountTitle">졸음 횟수</div>
            </div>
            <img 
              className="SleepCountPicture" 
              src={SleepCountPicture} 
              alt="SleepCountPicture" 
            />
            <div className="SleepCountNumber"> -- 번</div>
          </div>
          <div 
            className="UnderPlayButton" 
            onClick={startTimer}>
            <img 
              className="UnderPlay" 
              src={UnderPlay} 
              alt="UnderPlay" 
            />
          </div>
          <div 
            className="UnderPauseButton" 
            onClick={pauseTimer}>
            <img 
              className="UnderPause" 
              src={UnderPause} 
              alt="UnderPause" 
            />
          </div>
          <div 
            className="UnderResetButton"
            onClick={resetTimer}>
            <img 
              className="UnderReset" 
              src={UnderReset} 
              alt="UnderReset" 
            />
          </div>
          {!isStarted && (
            <div className="startButton" 
              onClick={connectStart}>
              <div className="StartText">시 작</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

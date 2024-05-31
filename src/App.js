import React, { useState, useEffect } from 'react';
import './App.css';
import SignUp from './Signup';
import Sidebar from './Sidebar';
import logo from './_logo.png';
import SideButton from './_SideButton.png';
import StateStudy from './_StateStudy.gif'; //상태gif-공부중
//import StateStudy from './_StateSleep.gif'; //상태gif-조는중
import HeartRatePicture from './_HeartRatePicture.png';
import ConcentrationValueTri from './_ConcentrationValueTri.png';
import './Sidebar.css';

const App = () => {
  const [sideBarVisible, setSidebarVisible] = useState(false); // 사이드바 보이기 여부
  const [isStarted, setIsStarted] = useState(false); // 사직 버튼 보이기 여부
  const [showSignUp, setShowSignUp] = useState(false); // 회원가입 페이지 정보
  const [currentDate, setCurrentDate] = useState(''); // 현재 날짜 정보
  const [user, setUser] = useState(null); // 사용자 정보
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const [currentPage, setCurrentPage] = useState('main'); // 현재 페이지 정보(메인 페이지, 회원가입 페이지)

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
    setShowSignUp(!showSignUp);
    setCurrentPage('signup');
  };

  // 회원가입
  const handleUserSignUp = (userData) => {
    setUser(userData);
    setShowSignUp(false);
    setCurrentPage('main');
  };

  // 로그아웃
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // 현재 페이지 정보
  const navigateToMain = () => {
    setCurrentPage('main');
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
            <div className="TimerTime">00 : 00 : 00</div>
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
            <div className="HeartRateBpm"> -- BPM</div>
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
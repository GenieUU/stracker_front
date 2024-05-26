import React, { useState, useEffect } from 'react';
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
  const [user, setUser] = useState(null); // 사용자 정보
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 오늘 날짜 넣기
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setCurrentDate(formattedDate);
  }, []);

  // Start 연결 시도 함수
  const connectStart = () => {
    console.log('Start');
  };

  // 회원가입 페이지 보이기
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  // 회원가입
  const handleUserSignUp = (userData) => {
    setUser(userData);
    setShowSignUp(false);
  };

  // 로그아웃
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUser(null);
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
          <div className="CameraScreen" />
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
            <div className="HeartRateBpm">80 BPM</div>
          </div>
          <div className="State">
            <div className="StateBox" />
            <div className="StateText">깨어 있음</div>
            <div className="StatePicture" />
          </div>
          <div 
          className="startButton" 
          onClick={connectStart}
          />
          <div className="StartText">시  작</div>

        </>
      )}
    </div>
  );
};

export default App;

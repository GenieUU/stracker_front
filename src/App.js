import React, { useState } from 'react';
import './App.css';
import SignUp from './Signup'; 
import logo from './_logo.png';
import SideButton from './_SideButton.png';
import HeartRatePicture from './_HeartRatePicture.png';
import ConcentrationValueTri from './_ConcentrationValueTri.png';
import OutPictureX from './_OutPictureX.png';
import './Sidebar.css';

const App = () => {
  const [sideBarVisible, setSidebarVisible] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  //회원가입 페이지 보이기
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="Main">
      <div className="Background" />
      <img 
      className="Logo" 
      src={logo} 
      alt="Logo" />
      <div className="CameraScreen" />
      <img
        className="SideButton"
        src={SideButton}
        alt="SideButton"
        onClick={() => setSidebarVisible(!sideBarVisible)}
      />
      {sideBarVisible && (
        <div className="Side">
          <div className="SidebarText" onClick={toggleSignUp}>회원가입</div> {/* Toggle SignUp page visibility on click */}
          <div className="Line" />
          <img 
          className="OutPictureX" 
          src={OutPictureX} 
          alt="OutPictureX" />
          <div className="Idbox" />
          <div className="Passwordbox" />
          <div className="Loginbox" />
          <div className="LoginText">로그인</div>
          <div className="Id">ID</div>
          <div className="Password">PASSWORD</div>
          <div className="SettingsPicture">
          </div>
          <div className="LogOutPicture">
          </div>
          <div className="StatisticsText1">학습량 통계 확인하기</div>
          <div className="StatisticsText2">집중도 통계 확인하기</div>
          <div className="StatisticsText3">공부 체크리스트 메모</div>
        </div>
      )}
      {showSignUp && <SignUp />} {/* Render SignUp page if showSignUp state is true */}
      <div className="Time">
        <div className="TimerDate">2024년 12월 30일</div>
        <div className="TimerTime">00 : 00 : 00</div>
      </div>
      <div className="Concentration">
        <div className="ConcentrationValue" />
        <img 
        className="ConcentrationValueTri"
        src={ConcentrationValueTri} 
        alt="ConcentrationValueTri" />
        <div className="ConcentrationTitleBox" />
        <div className="ConcentrationTitle">현재 집중도</div>
      </div>
      <div className="HeartRate">
        <div className="HeartRateTitleBox" />
        <div className="HeartRateTitle">현재 심박수</div>
        <img 
        className="HeartRatePicture" 
        src={HeartRatePicture} 
        alt="HeartRatePicture" />
        <div className="HeartRateBpm">80 BPM</div>
      </div>
      <div className="State">
        <div className="StateBox" />
        <div className="StateText">깨어 있음</div>
        <div className="StatePicture" />
      </div>
      <div className="startButton" />
      <div className="StartText">시  작</div>
    </div>
  );
};

export default App;

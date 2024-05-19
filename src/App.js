import React, { useState } from 'react';
import './App.css';
import logo from './로고_완성본_제외제거.png';
import SideButton from './사이드바_배경제거.png';
import './Sidebar.css'; // Sidebar-related style file import

const App = () => {
  // State to manage sidebar visibility
  const [sideBarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="Main">
      <div className="Background" />
      <img className="Logo" src={logo} alt="Logo" />
      <div className="CameraScreen" />
      <img
        className="SideButton"
        src={SideButton}
        alt="SideButton"
        onClick={() => setSidebarVisible(!sideBarVisible)}
      />
      {sideBarVisible && (
        <div className="Side">
          <div className="SidebarText">회원가입</div>
          <div className="Line" />
          <div className="Vector" />
          <div className="Idbox" />
          <div className="Passwordbox" />
          <div className="Loginbox" />
          <div className="LoginText">로그인</div>
          <div className="Id">ID</div>
          <div className="Password">PASSWORD</div>
          <div className="IcRoundSettings">
            <div className="Vector" />
          </div>
          <div className="IcRoundLogOut">
            <div className="Vector" />
            <div className="Vector" />
          </div>
          <div className="StatisticsText1">학습량 통계 확인하기</div>
          <div className="StatisticsText2">집중도 통계 확인하기</div>
          <div className="StatisticsText3">공부 체크리스트 메모</div>
        </div>
      )}
      <div className="Time">
        <div className="TimerDate">2024년 12월 30일</div>
        <div className="TimerTime">00 : 00 : 00</div>
      </div>
      <div className="Concentration">
        <div className="ConcentrationValue" />
        <div className="ConcentrationValueTri" />
        <div className="ConcentrationTitleBox" />
        <div className="ConcentrationTitle">현재 집중도</div>
      </div>
      <div className="HeartRate">
        <div className="HeartRateTitleBox" />
        <div className="HeartRateTitle">현재 심박수</div>
        <div className="HeartRatePicture" />
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

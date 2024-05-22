import React from 'react';
import './Sidebar.css';
import SideButton from './_SideButton.png';
import OutPictureX from './_OutPictureX.png';

const Sidebar = ({ sideBarVisible, toggleSidebar, toggleSignUp }) => {
  return (
    <>
      <img
        className="SideButton"
        src={SideButton}
        alt="SideButton"
        onClick={toggleSidebar}
      />
      {sideBarVisible && (
        <div className="Side">
          <div className="SidebarText" onClick={toggleSignUp}>회원가입</div>
          <div className="Line" />
          <img 
            className="OutPictureX" 
            src={OutPictureX} 
            alt="OutPictureX" 
            onClick={toggleSidebar}
          />
          <div className="Idbox" />
          <div className="Passwordbox" />
          <div className="Loginbox" />
          <div className="LoginText">로그인</div>
          <div className="Id">ID</div>
          <div className="Password">PASSWORD</div>
          <div className="SettingsPicture" />
          <div className="LogOutPicture" />
          <div className="StatisticsText1">학습량 통계 확인하기</div>
          <div className="StatisticsText2">집중도 통계 확인하기</div>
          <div className="StatisticsText3">공부 체크리스트 메모</div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

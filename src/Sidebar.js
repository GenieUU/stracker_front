import React, { useState } from 'react';
import './Sidebar.css';
import SideButton from './_SideButton.png';
import OutPictureX from './_OutPictureX.png';

const Sidebar = ({ sideBarVisible, toggleSidebar, toggleSignUp }) => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // SUIdbox에 입력된 값이 변경 시 호출
  const handleUserId = (event) => {
    setUserId(event.target.value);
  };

  // Password 입력란에 입력된 값이 변경 시 호출
  const handleUserPassword = (event) => {
    setUserPassword(event.target.value);
  };

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
s
          <input
        className="Idbox"
        type="text"
        value={userId}
        onChange={handleUserId}
      />

                <input
        className="Passwordbox"
        type="text"
        value={userPassword}
        onChange={handleUserPassword}
      />
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

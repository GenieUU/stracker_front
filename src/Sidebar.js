import React, { useState } from 'react';
import './Sidebar.css';
import SideButton from './_SideButton.png';
import OutPictureX from './_OutPictureX.png';
import LogOutPicture from './_LogOutPicture.png';
import SettingsPicture from './_SettingsPicture.png';
import BluetoothPicture from './_BluetoothPicture.png';

const Sidebar = ({ sideBarVisible, toggleSidebar, toggleSignUp }) => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // ID에 입력된 값이 변경 시 호출
  const handleUserId = (event) => {
    setUserId(event.target.value);
  };

  // Password 입력란에 입력된 값이 변경 시 호출
  const handleUserPassword = (event) => {
    setUserPassword(event.target.value);
  };

  // Bluetooth 연결 시도 함수
  const connectBluetooth = () => {
    console.log('Bluetooth');
  };
  
  // LogOut 연결 시도 함수
  const connectLogOut = () => {
    console.log('LogOut');
  };

  // Bluetooth 연결 시도 함수
  const connectSettings = () => {
    console.log('Settings');
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
          <img 
            className="OutPictureX" 
            src={OutPictureX} 
            alt="OutPictureX" 
            onClick={toggleSidebar}
          />
          <input
          className="Idbox"
          type="text"
          value={userId}
          onChange={handleUserId}
          placeholder=" ID"
          />
          <input
          className="Passwordbox"
          type="text"
          value={userPassword}
          onChange={handleUserPassword}
          placeholder=" PASSWORD"
          />
          <div className="Loginbox" />
          <div className="LoginText">로그인</div>
          <img 
            className="BluetoothPicture" 
            src={BluetoothPicture} 
            alt="BluetoothPicture" 
            onClick={connectBluetooth}
          />
          <img 
            className="LogOutPicture" 
            src={LogOutPicture} 
            alt="LogOutPicture" 
            onClick={connectLogOut}
          />
          <img 
            className="SettingsPicture" 
            src={SettingsPicture} 
            alt="SettingsPicture" 
            onClick={connectSettings}
          />
        </div>
      )}
    </>
  );
};

export default Sidebar;

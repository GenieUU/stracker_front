import React, { useState } from 'react';
import './Sidebar.css';
import SideButton from './_SideButton.png';
import OutPictureX from './_OutPictureX.png';
import LogOutPicture from './_LogOutPicture.png';
import SettingsPicture from './_SettingsPicture.png';
import BluetoothPicture from './_BluetoothPicture.png';

const Sidebar = ({ sideBarVisible, toggleSidebar, toggleSignUp, user, isLoggedIn, setIsLoggedIn, handleLogOut }) => {
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

  // 로그인 시도
  const handleLogin = () => {
    if (user && userId === user.userId && userPassword === user.userPassword) {
      setIsLoggedIn(true);
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  // Bluetooth 연결 시도 함수
  const connectBluetooth = () => {
    console.log('Bluetooth');
  };
  
  // LogOut 연결 시도 함수
  const connectLogOut = () => {
    console.log('LogOut');
  };

  // Settings 연결 시도 함수
  const connectSettings = () => {
    console.log('Settings');
  };

  return (
    <>
      {sideBarVisible && (
        <div className="Side">
          <img 
          className="SideButton" 
          src={SideButton} 
          alt="SideButton" 
          onClick={toggleSidebar} />
          {isLoggedIn ? (
            <>
              <div className="WelcomeMessage">
                {user.userName}님 환영합니다.
              </div>
              <div 
              className="LogoutBox" 
              onClick={handleLogOut}>
                <div className="LogoutText">로그아웃</div>
              </div>
            </>
          ) : (
            <>
              <div 
              className="SingUpText" 
              onClick={toggleSignUp}>회원가입
              </div>
              <img 
              className="OutPictureX" 
              src={OutPictureX} 
              alt="OutPictureX" 
              onClick={toggleSidebar} />
              <input
                className="Idbox"
                type="text"
                value={userId}
                onChange={handleUserId}
                placeholder=" ID"
              />
              <input
                className="Passwordbox"
                type="password"
                value={userPassword}
                onChange={handleUserPassword}
                placeholder=" PASSWORD"
              />
              <div className="Loginbox" onClick={handleLogin}>
                <div className="LoginText">로그인</div>
              </div>
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
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
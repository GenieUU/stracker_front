import React, { useState } from 'react';
import './Sidebar.css';
import SideButton from './_SideButton.png';
import OutPictureX from './_OutPictureX.png';
import LogOutPicture from './_LogOutPicture.png';
import SettingsPicture from './_SettingsPicture.png';
import BluetoothPicture from './_BluetoothPicture.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Sidebar = ({ sideBarVisible, toggleSidebar, toggleSignUp, user, isLoggedIn, setIsLoggedIn, handleLogOut, setHeartRate }) => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleUserId = (event) => setUserId(event.target.value);
  const handleUserPassword = (event) => setUserPassword(event.target.value);

  const handleLogin = async () => {
    try {
      const email = `${userId}`;
      const userCredential = await signInWithEmailAndPassword(auth, email, userPassword);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserName(userData.userName);
        setIsLoggedIn(true);
        console.log('로그인 성공:', userCredential.user);
      } else {
        console.error('사용자 정보를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('heart_rate');
      const characteristic = await service.getCharacteristic('heart_rate_measurement');

      characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', handleHeartRateMeasurement);

      console.log('Bluetooth device connected');
    } catch (error) {
      console.error('Error connecting to Bluetooth device:', error);
    }
  };

  const handleHeartRateMeasurement = (event) => {
    const value = event.target.value;
    const heartRate = value.getUint8(1);
    setHeartRate(heartRate);
  };

  const connectLogOut = () => {
    console.log('LogOut');
  };

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
            onClick={toggleSidebar} 
          />
          {isLoggedIn ? (
            <>
              <div className="WelcomeMessage">
                {userName}님 환영합니다.
              </div>
              <img 
                className="OutPictureX" 
                src={OutPictureX} 
                alt="OutPictureX" 
                onClick={toggleSidebar} 
              />
            </>
          ) : (
            <>
              <div 
                className="SingUpText" 
                onClick={toggleSignUp}
              >
                회원가입
              </div>
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

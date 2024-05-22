import React, { useState } from 'react';
import './Signup.css';
import Sidebar from './Sidebar';
import logo from './_logo.png';
import SideButton from './_SideButton.png';
import EmailArrow from './_EmailArrow.png';

const SignUp = ({ sideBarVisible, toggleSidebar }) => {
  const [userId, setUserId] = useState('');
  const [userPasswordChange, setUserPasswordChange] = useState('');
  const [userPasswordcheck, setUserPasswordcheck] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  
  // SUIdbox에 입력된 값이 변경 시 호출
  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  // Password 입력란에 입력된 값이 변경 시 호출
  const handleUserPasswordChange = (event) => {
    setUserPasswordChange(event.target.value);
  };

  // Passwordcheck 입력란에 입력된 값이 변경 시 호출
  const handleUserPasswordcheck = (event) => {
    setUserPasswordcheck(event.target.value);
  };

  // Name 입력란에 입력된 값이 변경 시 호출
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
   
  // Email 입력란에 입력된 값이 변경 시 호출
  const handleUserEmail = (event) => {
    setUserEmail(event.target.value);
  };

  return (
    <div className="SignUp">
      <div className="Background" />
      <img
        className="Logo"
        src={logo}
        alt="Logo"
      />
      <img
        className="SideButton"
        src={SideButton}
        alt="SideButton"
        onClick={toggleSidebar}
      />
      <Sidebar
        sideBarVisible={sideBarVisible}
        toggleSidebar={sideBarVisible}
      />
      <div className="AtSymbol">@</div>
      <input
        className="SUIdbox"
        type="text"
        value={userId}
        onChange={handleUserIdChange}
      />
      <div className="SURepetitioncheckbox" />
      <div className="SUFinishbox" />
      <input
        className="SUNamebox"
        type="text"
        value={userName}
        onChange={handleUserName}
      />
      <input
        className="SUEmailbox"
        type="text"
        value={userEmail}
        onChange={handleUserEmail}
      />
      <div className="SUEmailselfbox" />
      <div className="SUEmailselectbox" />
      <input
        className="SUPasswordbox"
        type="text"
        value={userPasswordChange}
        onChange={handleUserPasswordChange}
        placeholder="8~20자로 입력해주세요"
      />
      <input
        className="SUPasswordcheckbox"
        type="text"
        value={userPasswordcheck}
        onChange={handleUserPasswordcheck}
        placeholder="비밀번호를 다시 입력해주세요"
      />
      <div className="Idline"></div>
      <div className="Emailline"></div>
      <div className="Passwordline"></div>
      <div className="Passwordcheckline"></div>
      <div className="Nameline"></div>
      <div className="IdText">아이디</div>
      <div className="PasswordText">비밀번호</div>
      <div className="PasswordCheckText">비밀번호 확인</div>
      <div className="EmailSelfHint">직접 입력</div>
      <img
        className="EmailArrow"
        src={EmailArrow}
        alt="EmailArrow"
      />
      <div className="FinishText">가입완료</div>
      <div className="SignupTitle">
        <div className="TitleText">회원가입</div>
        <div className="Titleline"></div>
      </div>
      <div className="Lastline"></div>
      <div className="NameText">이름</div>
      <div className="EmailText">이메일</div>
    </div>
  );
}

export default SignUp;

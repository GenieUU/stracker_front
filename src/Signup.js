import React, { useState } from 'react';
import './Signup.css';
import Sidebar from './Sidebar';
import logo from './_logo.png';
import SideButton from './_SideButton.png';
import EmailArrow from './_EmailArrow.png';

const SignUp = ({ sideBarVisible, toggleSidebar }) => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('8~20자로 입력해주세요');
  
  // SUIdbox에 입력된 값이 변경 시 호출
  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  // Password 입력란에 입력된 값이 변경 시 호출
  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

   // 초기 상태인지 확인하여 클래스를 동적으로 할당
   const passwordInputClass = userPassword === '8~20자로 입력해주세요' ? 'SUPasswordbox InitialState' : 'SUPasswordbox';
   
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
      <div className="SUNamebox" />
      <div className="SUEmailbox" />
      <div className="SUEmailselfbox" />
      <div className="SUEmailselectbox" />
      <input
        className="SUPasswordbox"
        type="text"
        value={userPassword}
        onChange={handleUserPasswordChange}
      />
      <div className="SUPasswordcheckbox" />
      <div className="Idline"></div>
      <div className="Emailline"></div>
      <div className="Passwordline"></div>
      <div className="Passwordcheckline"></div>
      <div className="Nameline"></div>
      <div className="IdText">아이디</div>
      <div className="PasswordText">비밀번호</div>
      <div className="PasswordCheckText">비밀번호 확인</div>
      <div className="PasswordCheckHint">비밀번호를 다시 입력해주세요.</div>
      <div className="EmailSelfHint">직접 입력</div>
      <img
        className="EmailArrow"
        src={EmailArrow}
        alt="EmailArrow"
      />
      <div className="CheckDuplicationText">중복 확인</div>
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

import React, { useState } from 'react';
import './Signup.css';
import Sidebar from './Sidebar';
import logo from './_logo.png';
import SideButton from './_SideButton.png';
import EmailArrow from './_EmailArrow.png';

const SignUp = ({toggleSidebar, sideBarVisible, navigateToMain}) => {
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordCheck, setUserPasswordCheck] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userEmailDomain, setUserEmailDomain] = useState('');
  const [customEmailDomain, setCustomEmailDomain] = useState('');
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);

  // Password 입력란에 입력된 값이 변경 시 호출
  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  // Passwordcheck 입력란에 입력된 값이 변경 시 호출
  const handleUserPasswordChangeCheck = (event) => {
    setUserPasswordCheck(event.target.value);
  };

  // Name 입력란에 입력된 값이 변경 시 호출
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
   
  // Email 입력란에 입력된 값이 변경 시 호출
  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  // EmailSelect 입력란에 입력된 값이 변경 시 호출
  const handleEmailDomainSelect = (domain) => {
    setUserEmailDomain(domain);
    setCustomEmailDomain('');
    setShowEmailDropdown(false);
  };

  // EmailSelf 입력란에 입력된 값이 변경 시 호출
  const handleCustomEmailDomainChange = (event) => {
    setCustomEmailDomain(event.target.value);
    setUserEmailDomain('');
  };

    // EmailSelect 입력란에 입력된 값이 변경 시 호출
  const toggleEmailDropdown = () => {
    setShowEmailDropdown(!showEmailDropdown);
  };

  // Finish 검사
  const handleFinishClick = () => {
    if (
      !userPassword ||
      !userPasswordCheck ||
      !userName ||
      !userEmail ||
      (!userEmailDomain && !customEmailDomain)
    ) {
      alert("입력되지 않은 부분이 있습니다. 다시 확인해주세요.");
      return;
    }

    if (userPassword !== userPasswordCheck) {
      alert("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.");
      return;
    }

    //데이터 저장
    const emailDomain = customEmailDomain || userEmailDomain;
    const userData = {
      userPassword,
      userName,
      userEmail,
      emailDomain,
    };

    console.log("User Data:", userData);
    // 로그인 데이터
  };

  return (
    <div className="SignUp">
      <div className="Background" />
      <img
        className="Logo"
        src={logo}
        alt="Logo"
        onClick={navigateToMain}
      />
      <img
        className="SideButton"
        src={SideButton}
        alt="SideButton"
        onClick={toggleSidebar}
      />
      <Sidebar
        sideBarVisible={sideBarVisible}
        toggleSidebar={toggleSidebar}
      />
      <div className="TitleText">회원가입</div>
      <div className="Titleline"></div>
      <div className="Emailline"></div>
      <div className="Passwordline"></div>
      <div className="Passwordcheckline"></div>
      <div className="Nameline"></div>
      <div className="PasswordText">비밀번호</div>
      <div className="PasswordCheckText">비밀번호 확인</div>
      <div className="NameText">이름</div>
      <div className="EmailText">이메일</div>
      <input
        className="SUPasswordbox"
        type="password"
        value={userPassword}
        onChange={handleUserPasswordChange}
        placeholder="8~20자로 입력해주세요"
      />
      <input
        className="SUPasswordcheckbox"
        type="password"
        value={userPasswordCheck}
        onChange={handleUserPasswordChangeCheck}
        placeholder="비밀번호를 다시 입력해주세요"
      />
      <input
        className="SUNamebox"
        type="text"
        value={userName}
        onChange={handleUserNameChange}
        placeholder="이름을 입력해주세요"
      />
      <input
        className="SUEmailbox"
        type="text"
        value={userEmail}
        onChange={handleUserEmailChange}
      />
      <div className="AtSymbol">@</div>
      <div className="SUEmailselfbox" >
        <div className="SUEmailselfboxInner">
        {customEmailDomain ? (
            <input
              className="CustomEmailDomainInput"
              type="text"
              value={customEmailDomain}
              onChange={handleCustomEmailDomainChange}
              placeholder="직접입력"
            />
          ) : (
            <span>{userEmailDomain}</span>
          )}
          <img 
          className="EmailArrow" 
          src={EmailArrow} 
          alt="EmailArrow"
          onClick={toggleEmailDropdown} />
        </div>
        {showEmailDropdown && (
          <div className="EmailDropdown">
            <div className="EmailOption" 
            onClick={() => handleEmailDomainSelect('naver.com')}>naver.com</div>
            <div className="EmailOption" 
            onClick={() => handleEmailDomainSelect('gmail.com')}>gmail.com</div>
            <div className="EmailOption" 
            onClick={() => handleEmailDomainSelect('hanmail.com')}>hanmail.com</div>
            <div className="EmailOption" 
            onClick={() => handleEmailDomainSelect('hotmail.com')}>hotmail.com</div>
            <div className="EmailOption" 
            onClick={() => handleEmailDomainSelect('nate.com')}>nate.com</div>
            <div className="EmailOption">
              <input
                className="CustomEmailOptionInput"
                type="text"
                value={customEmailDomain}
                onChange={handleCustomEmailDomainChange}
                placeholder="직접 입력"
              />
              </div>
          </div>
        )}
      </div>
      <div className="SUFinishbox" 
      onClick={handleFinishClick}>
        <div className="FinishText">가입완료</div>
      </div>
    </div>
  );
}

export default SignUp;

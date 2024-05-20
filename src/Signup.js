import React from 'react';
import logo from './_logo.png';

const SignUp = () => {
  return (
    <div className="SignUp" >
  <div className="Sidebutton" >
    <div className="Rectangle18"  />
    <div className="Rectangle19" />
    <div className="Rectangle20" />
  </div>
  <div className="Background" />
  <img 
  className="Logo" 
  src={logo} 
  alt="Logo" />
  <div style={{left: 840.01, top: 650, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>@</div>
  <div className="Idbox"  />
  <div className="Repetitioncheckbox" />
  <div className="Finishbox" />
  <div className="Namebox" />
  <div className="Emailbox" />
  <div className="Emailselfbox" />
  <div className="Emailselectbox" />
  <div className="Passwordbox" />
  <div className="Passwordcheckbox" />
  <div className="Idline" ></div>
  <div className="Emailline" ></div>
  <div className="Passwordline" ></div>
  <div className="Passwordcheckline" ></div>
  <div className="Nameline" ></div>
  <div style={{left: 222.01, top: 337.96, position: 'absolute', color: 'black', fontSize: 28, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>아이디</div>
  <div style={{left: 222.01, top: 416.96, position: 'absolute', color: 'black', fontSize: 28, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>비밀번호</div>
  <div style={{left: 222.01, top: 495.96, position: 'absolute', color: 'black', fontSize: 28, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>비밀번호 확인</div>
  <div className="820" style={{left: 501.01, top: 416.96, position: 'absolute', color: '#919191', fontSize: 28, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>영문, 숫자, 특수문자 포함 8~20자리</div>
  <div style={{left: 501.01, top: 495.96, position: 'absolute', color: '#919191', fontSize: 28, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>비밀번호를 다시 입력해주세요.</div>
  <div style={{left: 896.01, top: 733, position: 'absolute', color: '#919191', fontSize: 28, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>직접 입력</div>
  <div className="FluentIosArrow24Filled" style={{width: 24, height: 24, left: 1179.01, top: 757, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0'}}>
    <div className="Vector" style={{width: 10.51, height: 20.01, left: 2.50, top: 2, position: 'absolute', background: '#717171'}}></div>
  </div>
  <div style={{left: 1101.01, top: 338, position: 'absolute', color: 'white', fontSize: 28, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>중복 확인</div>
  <div style={{left: 668, top: 891, position: 'absolute', color: 'white', fontSize: 28, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>가입완료</div>
  <div className="SignupTitle">
    <div style={{left: 27, top: 21, position: 'absolute', color: '#C4AB97', fontSize: 45, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>회원가입</div>
    <div className="Tileline" ></div>
  </div>
  <div className="Lastline" ></div>
  <div style={{left: 223.01, top: 575, position: 'absolute', color: 'black', fontSize: 28, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>이름</div>
  <div style={{left: 223.01, top: 653, position: 'absolute', color: 'black', fontSize: 28, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>이메일</div>
</div>
  );
};

export default SignUp;
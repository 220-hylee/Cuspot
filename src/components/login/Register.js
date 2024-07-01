import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebase";
import { LoginAction } from "../../store/actions/auth";
import Style from "./Style";
<<<<<<< HEAD
import { Paper } from "@material-ui/core";
import Logo from "./../../assets/images/logo_width.png";
=======
import { Link } from "react-router-dom";

>>>>>>> 1256e82a89c688f30ceae1e2abf89ed8e3542e52

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""); // 이메일
  const [domain, setDomain] = useState("@naver.com"); // 도메인
  const [password, setPassword] = useState(""); // 비밀번호
  const [displayName, setDisplayName] = useState(""); // 이름
  const [photoURL, setPhotoURL] = useState(""); // 프로필 이미지
  const [address, setAddress] = useState(""); // 주소

  const classes = Style();

  // 회원가입 버튼 눌렀을시 작동
  const handleSignup = async (e) => {
    e.preventDefault();
    const fullEmail = email + domain; // 이메일과 도메인 결합

    try {
      // Firebase Auth에 이메일/비밀번호로 회원가입
      const userCredential = await auth.createUserWithEmailAndPassword(
        fullEmail,
        password
      );

      // Firebase Auth 사용자 프로필 업데이트 (displayName, photoURL 설정)
      await userCredential.user.updateProfile({
        displayName: displayName,
        photoURL: photoURL,
      });

      // Firestore에 추가 정보 저장
      await db.collection("users").doc(userCredential.user.uid).set({
        email: fullEmail,
        displayName: displayName,
        photoURL: photoURL,
        date: new Date(),
        address: address, 
      });

      // Redux에 사용자 정보 저장
      dispatch(
        LoginAction({
          displayName: displayName,
          email: fullEmail,
          photoURL: photoURL,
        })
      );

      // 회원가입 후 추가 작업 또는 페이지 이동

    } catch (error) {
      // 사용자에게 오류 메시지 표시 등
      if (error.code ==='auth/email-already-in-use') {
         alert("이메일이 존재합니다");
      }
      else if (error.code === 'auth/weak-password') {
        alert("비밀번호는 영문과 숫자를 포함한 6자리 이상이어야 합니다.");
      }else {
        console.error("Error signing up:", error.message);
      }
      
    }
  };

<<<<<<< HEAD

  // css
  return (
    <div className={classes.login__container}>
      <Paper elevation={3} className={classes.login}>
        <div className={classes.logo}>
              <img
                src={Logo}
                style={{ width: "300px", height: "150px" }}
                alt="linked-in-logo"
                />
           </div>
      <div>
                <h2>회 원 가 입 </h2><br/>
      <form className={classes.form} onSubmit={handleSignup} >
        <input
          type="text"
          placeholder="이름"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          <input
          type="text"
          placeholder="주소"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <br/>
        
        <button type="submit" style={{backgroundColor:'#2050B2'}}>회원가입</button>
        <br/><br/>
      </form>
    </div>
    </Paper>
  </div>
=======
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  };

  return (
    <div className={classes.login__container}>
      <div>
        <h2>회원가입</h2>
        <form onSubmit={handleSignup} className={classes.form}>
          {/* 이름 입력 칸 */}
          <input
            type="text"
            placeholder="이름"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
            
          {/* 이메일 입력 칸 */}
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
            required
      />
           @
           {/* 도메인 입력 칸 */}
            <select value={domain} onChange={handleDomainChange}>
              <option value="@naver.com">naver.com</option>
              <option value="@google.com">google.com</option>
              <option value="@daum.net">daum.net</option>
            </select>
           {/* 비밀번호 입력 칸 */}
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           {/* 주소 입력 칸 */}
          <input
            type="text"
            placeholder="주소"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {/* 회원가입 버튼 */}
          <button type="submit">회원가입</button>
        </form>
        <Link to="/">
            <button  className={classes.button}>뒤로가기</button>
          </Link>
      </div>
    </div>
>>>>>>> 1256e82a89c688f30ceae1e2abf89ed8e3542e52
  );

  
};

export default Register;

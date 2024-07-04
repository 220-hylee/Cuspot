import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebase";
import { LoginAction } from "../../store/actions/auth";
import Style from "./Style";
import { Paper } from "@material-ui/core";
import Logo from "./../../assets/images/logo_width.png";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [address, setAddress] = useState("");


  const classes = Style();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Firebase Auth에 이메일/비밀번호로 회원가입
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Firebase Auth 사용자 프로필 업데이트 (displayName, photoURL 설정)
      await userCredential.user.updateProfile({
        displayName: displayName,
        photoURL: photoURL,
      });

      // Firestore에 추가 정보 저장
      await db.collection("users").doc(userCredential.user.uid).set({
        email: email,
        displayName: displayName,
        photoURL: photoURL,
        date: new Date(),
        addres: address,
      });

      // Redux에 사용자 정보 저장
      dispatch(
        LoginAction({
          displayName: displayName,
          email: email,
          photoURL: photoURL,
        })
      );

      // 회원가입 후 추가 작업 또는 페이지 이동

    } catch (error) {
      console.error("Error signing up:", error.message);
      // 사용자에게 오류 메시지 표시 등
    }
  };


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
      </form>
      <Link to="/">
      <button className={classes.button}>뒤로가기</button>
      </Link>
    </div>
    </Paper>
  </div>
  );

  
};

export default Register;

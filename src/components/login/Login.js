import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Paper, TextField, Button } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase"; // assuming this is your Firebase 
//로그인 화면 로고 사진 파일
import Logo from "./../../assets/images/logo_width.png";
import Style from "./Style";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../store/actions/auth";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const classes = Style();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""); //  초기 이메일
  const [password, setPassword] = useState(""); // 초기 비밀번호
  
  // 구글 로그인시 작동
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: async (authResult) => {
        const user = authResult.user;
        const { uid, email, displayName, photoURL } = user;
        
        // 구글에 로그인한 정보를 저장하기
        await db.collection("users").doc(uid).set({
          email: email,
          displayName: displayName,
          photoURL: photoURL,
          date: new Date(),
          authProvider: "google", // Set auth provider as google
        }, { merge: true });
        
        dispatch(LoginAction(user));
        return false; // Avoid redirect
      },
    },
  };


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 로그인 버튼을 눌렀을때 작동됨
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase
        .auth()
        // 봄동에 auth에 로그인 정보 확인
        // .signInWithEmailAndPassword는 일반로그인시  사용합니다.
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      // 로그인이 됬을때 dispatch로  user 값이 변환된것을 알려줍니다.
      dispatch(LoginAction(user));
    } catch (error) {
      console.error("Error logging in with email and password", error);
      alert("이메일 또는 비밀번호가 잘못 입력되었습니다.");
    }
  };


  return (
      <div className={classes.login__container}>
        <Paper elevation={1} className={classes.login}>
         <div className={classes.logo}>
          <img
            src={Logo}
            style={{ width: "270px", height: "130px" }}
            alt="linked-in-logo"
          />
        </div>
        {/* 일반 로그인  */}
        <form className={classes.form} onSubmit={handleSubmit}>
          {/* 이메일 입력 */}
          <br/>
          <TextField
            style={{ width: "250px"}}
            type="email"
            label = "email"
            value={email}
            onChange={handleEmailChange}
            // required 
          />
          {/* 비밀번호 입력 */}
          <TextField
            style={{ width: "250px"}}
            type="password"
            label = "password"
            value={password}
            onChange={handlePasswordChange}
            // required
          /><br/>
          {/* 로그인 버튼 */}
          <Button type="submit"  className="loginBt"
            variant="contained"
            size = "small"
            color = "primary" >Login</Button><br/>
        </form>
    
    
        <div className={classes.google}>
          <section>
            <div></div>
            <p> OR </p>
            <div></div>
          </section>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <div className={classes.linkContainer}>
            <Link to="/register" className={classes.login_link}>회원가입</Link>
            <Link to="/findEmail" className={classes.login_link}>아이디 찾기</Link>
            <Link to="/rePassword" className={classes.login_link}>비밀번호 찾기</Link>
          </div>
        </div>
        <p style={{ marginTop: '10px', textAlign:'center'}}>copyright TTEZO</p>
        <div className={classes.repasswordSorry} >
          <p>구글로 로그인한 유저는 아이디 및 비밀번호 찾기를 제공해드리기 않습니다.</p>
        </div>
          <div className={classes.about}>
        </div>
      </Paper>
    </div>
  );
};



export default Login;
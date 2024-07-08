import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Paper, TextField, Button } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
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
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        {/* 일반 로그인  */}
        <form className={classes.form} onSubmit={handleSubmit}>
          {/* 이메일 입력 */}
          <br/>
          <TextField
           style={{ width: "270px"}}
            type="email"
            label = "email"
            value={email}
            onChange={handleEmailChange}
            required 
          />
          {/* 비밀번호 입력 */}
          <TextField

            type="password"
            label = "password"
            value={password}
            onChange={handlePasswordChange}
            required
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
            <Link to="/findEmail" className={classes.login_link}>ID찾기</Link>
            <Link to="/rePassword" className={classes.login_link}>비밀번호 찾기</Link>
         </div>
            <p>copywrite TTEZO</p>
        </div>
        <div className={classes.about}>
        </div>
      </Paper>
    </div>
  );
};


export default Login;
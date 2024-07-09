import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Paper, TextField, Button } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import Logo from "./../../assets/images/logo_width.png";
import Style from "./Style";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../store/actions/auth";
import { Link } from "react-router-dom";
import db from "../../firebase"; // assuming this is your Firebase configuration file

const Login = () => {
  const classes = Style();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 일반 로그인
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
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
        <form className={classes.form} onSubmit={handleSubmit}>
          <br />
          <TextField
            type="email"
            label="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <TextField
            type="password"
            label="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <br />
          <Button type="submit" style={{ backgroundColor: "#2050B2" }}>
            Login
          </Button>
          <Link to="/register" className={classes.login_link}>
            회원가입
          </Link>
          <Link to="/register" className={classes.login_link}>
            아이디 찾기
          </Link>
          <Link to="/register" className={classes.login_link}>
            비밀번호 찾기
          </Link>
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
          <p>copywrite TTEZO</p>
        </div>
        <div className={classes.about}></div>
      </Paper>
    </div>
  );
};

export default Login;

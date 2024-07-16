import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Paper, TextField, Button, IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import firebase from "firebase/app";
import "firebase/auth";
import db from "../../firebase"; // assuming this is your Firebase configuration file
import Logo from "./../../assets/images/logo_width.png";
import Style from "./Style";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../store/actions/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const classes = Style();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: async (authResult) => {
        const user = authResult.user;
        const { uid, email, displayName, photoURL } = user;

        await db.collection("users").doc(uid).set({
          email: email,
          displayName: displayName,
          photoURL: photoURL,
          date: new Date(),
          authProvider: "google",
        }, { merge: true });

        dispatch(LoginAction(user));
        return false; // Avoid redirect
      },
    },
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      dispatch(LoginAction(user));
    } catch (error) {
      console.error("Error logging in with email and password", error);
      alert("Your email or password was entered incorrectly.");
    }
  };

  return (
    <div className={classes.login__container}>
      <Paper elevation={1} className={classes.login}>
        <div className={classes.logo}>
          <img src={Logo} style={{ width: "270px", height: "130px" }} alt="linked-in-logo" />
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <br/>
          <TextField
            style={{ width: "250px" }}
            type="email"
            label="email"
            value={email}
            // autoComplete="email"
            required
            onChange={handleEmailChange}
          />
          <TextField
            style={{ width: "250px" }}
            type={showPassword ? "text" : "password"}
            label="password"
            value={password}
            required
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /><br/>
          <Button type="submit" className={classes.loginBt} variant="contained" color="primary">
            Login
          </Button><br/>
        </form>
        <div className={classes.google}>
          <section>
            <div></div>
            <p> OR </p>
            <div></div>
          </section>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          <div className={classes.linkContainer}>
            <Link to="/register" className={classes.login_link} variant="body1">회원가입</Link>
            <Link to="/findEmail" className={classes.login_link} variant="body1">아이디 찾기</Link>
            <Link to="/FindPassword" className={classes.login_link} variant="body1">비밀번호 찾기</Link>
          </div>
        </div>
        <p style={{ marginTop: '5px', textAlign: 'center', fontSize:"12px"}}>copyright TTEZO</p>
        <div className={classes.repasswordSorry}>
          <p>구글로 로그인한 유저는 아이디 및 비밀번호 찾기를 제공해드리기 않습니다.</p>
        </div>
      </Paper>
    </div>
  );
};

export default Login;

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
    <div className={classes.Backgroundimg}>
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
          />
          <br/>
          {/* 로그인 버튼 */}
          <Button type="submit" style={{backgroundColor:'#2050B2'}}>Login</Button>
          {/* 회원가입 링크 */}
          <Link to="/register" className={classes.login_link}>회원가입</Link>

        </form>

        <div className={classes.google}>
          <section>
            <div></div>
            <p>OR</p>
            <div></div>
          </section>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
        <div className={classes.about}>
          {/* <section>
            <div></div>
            <p>copywriter TTEZO</p>
            <div></div>
          </section> */}
          {/* <div>
            {author.map(({ src, url, color }, i) => (
              <a
                href={`${url}`}
                key={`author-link-${i}`}
                rel="noreferrer nofollow"
                target="_blank"
                style={{ color: color }}
              >
                {src}
              </a>
            ))}
          </div> */}
        </div>
      </Paper>
    </div>
    </div>
  );
};

// const author = [
//   { src: <GitHubIcon />, url: "https://github.com/phanison898", color: "black" },
//   {
//     src: <LinkedInIcon />,
//     url: "https://www.linkedin.com/in/phanison225/",
//     color: "#0057ae",
//   },
//   {
//     src: <YouTubeIcon />,
//     url: "https://www.youtube.com/channel/UC4FAldAo2Ow_2F447yggcqA",
//     color: "red",
//   },
//   {
//     src: <InstagramIcon />,
//     url: "https://www.instagram.com/phanison225/",
//     color: "#b7066e",
//   },
//   {
//     src: <TwitterIcon />,
//     url: "https://twitter.com/phanison225",
//     color: "rgb(29 161 242)",
//   },
// ];

export default Login;
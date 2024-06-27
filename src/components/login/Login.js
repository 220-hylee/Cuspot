import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Paper } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import Logo from "./../../assets/images/cpLogo.png";
import Style from "./Style";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../store/actions/auth";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const classes = Style();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

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
      alert("Failed to log in. Please check your email and password.");
    }
  };

  return (
    <div className={classes.login__container}>
      <Paper elevation={3} className={classes.login}>
        <div className={classes.logo}>
          <img
            src={Logo}
            style={{ width: "200px", height: "150px" }}
            alt="linked-in-logo"
          />
          <h4>Clone</h4>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit">Log In</button>
        </form>
          {/* 회원가입 링크 */}
          <Link to="/register">
            <button  className={classes.button}>회원가입</button>
          </Link>
          
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
          <section>
            <div></div>
            <p>Developer Info</p>
            <div></div>
          </section>
          <div>
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
          </div>
        </div>
      
      </Paper>
    </div>
  );
};

const author = [
  { src: <GitHubIcon />, url: "https://github.com/phanison898", color: "black" },
  {
    src: <LinkedInIcon />,
    url: "https://www.linkedin.com/in/phanison225/",
    color: "#0057ae",
  },
  {
    src: <YouTubeIcon />,
    url: "https://www.youtube.com/channel/UC4FAldAo2Ow_2F447yggcqA",
    color: "red",
  },
  {
    src: <InstagramIcon />,
    url: "https://www.instagram.com/phanison225/",
    color: "#b7066e",
  },
  {
    src: <TwitterIcon />,
    url: "https://twitter.com/phanison225",
    color: "rgb(29 161 242)",
  },
];

export default Login;

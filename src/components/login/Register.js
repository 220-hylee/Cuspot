import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebase";
import { LoginAction } from "../../store/actions/auth";
import Style from "./Style";
import { Paper, TextField,Button } from "@material-ui/core";
import Logo from "./../../assets/images/logo_width.png";
import { Link } from "react-router-dom";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";


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
      <Paper elevation={1} className={classes.login}>
        <div className={classes.logo}>
          <img
            src={Logo}
            style={{ width: "270px", height: "130px" }}
            alt="linked-in-logo"/>
        </div>
      <div className="signUp">
      <form className={classes.form} onSubmit={handleSignup} >
        <TextField
          type="text"
          label = "name"
          // placeholder="Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <TextField
          type="email"
          label = "email"
          // placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          label = "password"
          // placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          <TextField
          type="text"
          label = "address"
          // placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <br/>
        
        <Button type="submit" size="large"
        style={{backgroundColor:'#2050B2'}}>Sign</Button>
         <Link to="/" className={classes.Register_link}>뒤로가기</Link> <br/>
      </form>
    </div>
      <br/><br/><br/>
      <div className={classes.about}>
          <section>
            <div></div>
            <p>copywriter TTEZO</p>
            <div></div>
          </section>
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


export default Register;

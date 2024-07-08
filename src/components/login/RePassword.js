import React, { useState } from 'react';
import { functions } from "../../firebase"; // Firebase 초기화 파일에서 functions 가져오기
import Style from "./Style";
import { Paper, TextField, Button } from "@material-ui/core";
import Logo from "./../../assets/images/logo_width.png";
import { Link } from "react-router-dom";

// import { auth, db } from "../../firebase";

// const ResetPassword = () => {
//   const [displayName, setDisplayName] = useState('');
//   const [email, setEmail] = useState('');
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleResetPassword = async () => {
//     const sendTemporaryPassword = functions.httpsCallable('sendTemporaryPassword');

//     try {
//       const response = await sendTemporaryPassword({ displayName, email});
//       setResult(response.data.message);
//       setError(null);
//     } catch (err) {
//       console.error("임시 비밀번호 전송 중 오류 발생:", err);
//       setError(err.message);
//       setResult(null);
//     }
//   };

const RePassword = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
  
    const classes = Style();


    const handleResetPassword = async () => {
      const sendTemporaryPassword = functions.httpsCallable('sendTemporaryPassword');
  
      try {
        const response = await sendTemporaryPassword({ displayName, email });
        setResult(response.data.message);
        setError(null);
      } catch (err) {
        console.error("임시 비밀번호 전송 중 오류 발생:", err);
        setError(err.message);
        setResult(null);
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
      <div>
        <h1>비밀번호 재설정</h1>
        <TextField
        style={{ width: "260px"}}
           required
          label="name"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="name"
        /> <br/>
        <TextField
        style={{ width: "260px"}}
           required
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        /><br/>
        <Button className={classes.findEmail_bt} onClick={handleResetPassword}
          variant="contained"
          size = "small"
          color = "primary">✉️이메일 전송</Button>
          
        <Link to="/" className={classes.link_back}>back</Link>
        {result && <p>{result}</p>}
        {error && <p>{error}</p>}
      </div>
      <p style={{ marginTop: '20px' }}>copywrite TTEZO</p>
      </Paper>
      </div>
    );
  };
  
  export default RePassword;
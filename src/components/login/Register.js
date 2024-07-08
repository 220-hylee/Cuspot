import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebase";
import { LoginAction } from "../../store/actions/auth";
import Style from "./Style";
import { Paper, TextField, Button } from "@material-ui/core";
import Logo from "./../../assets/images/logo_width.png";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");


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
        password: password,
        displayName: displayName,
        photoURL: photoURL,
        date: new Date(),
        addres: address,
        phone: phone
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
    <div className={classes.register__container}>
      <Paper elevation={1} className={classes.register}>
        <div className={classes.logo}>
          <img
            src={Logo}
            style={{ width: "270px", height: "130px" }}
            alt="linked-in-logo"/>
        </div>
      <form className={classes.form_register} onSubmit={handleSignup}>
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
         <TextField
          type="text"
          label = "phone"
          // placeholder="[address]"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
         <Button 
            type="submit"
            size="large"
            style={{ backgroundColor: "#2050B2" }}
          >
            Sign Up
          </Button>
        </form>
        <div className={classes.Register_link}>
          <Link to="/" className={classes.egister_link}>
            뒤로가기
          </Link>
          <br />
          <section>
            <div></div>
            <p>copywriter TTEZO</p>
            <div></div>
          </section>
        </div>
        {/* classes.about */}
      </Paper>
    </div>
  );
};


export default Register;

import React, { useState } from 'react';
import { auth, db } from "../../firebase";
import Style from "./Style";
import { Paper, TextField, Modal, Typography } from "@material-ui/core";
import Logo from "./../../assets/images/logo_width.png";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const FindEmail = () => {
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // 모달 상태 추가

  const classes = Style();
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const searchEmail = async () => {
    try {
      const querySnapshot = await db.collection('users')
        .where('displayName', '==', displayName)
        .where('phone', '==', phone)
        .get();


        // 봄동에서 데이터 검색
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data(); // 첫 번째 일치하는 문서

        //성공
        setResult(user.email);
        setError(null);
        handleOpen(); // 모달 열기


      } else {
        // 검색은 성공이지만 해당하는 데이터 없음
        setResult(null);
        setError('해당 조건에 맞는 사용자를 찾을 수 없습니다!');
        handleOpen(); // 모달 열기

      }

      //검색자체가 실패
    } catch (err) {
      console.error("사용자 검색 중 오류 발생:", err);
      setError('사용자 검색 중 오류 발생.');
      setResult(null);
      handleOpen(); // 모달 열기

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
      <div className='searchEmail_form'>
      <h2 style={{ textAlign: 'center' }}>Find E-mail</h2>
      <br/>
      <TextField
       style={{ width: "260px"}}
      //  required 
        label="name"
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="name" >
       </TextField>
        <br/>
      <TextField
        style={{ width: "260px"}}
        label="phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="phone">
        </TextField>
        <br/>

        <Button className={classes.findEmail_bt} 
          onClick={searchEmail}
          size = "small"
          variant="contained"
          color = "primary"
        >Search</Button>

          <div className={classes.linkContainer}>
            <Link to="/" className={classes.link_back}>back</Link> <br/>
            <Link to="/rePassword" className={classes.link_back}>pwd찾기</Link>
         </div>
      
      <text className={classes.email_result}>
      </text>

      </div>
      <p style={{ marginTop: '60px', textAlign: 'center' }}>copyright TTEZO</p>
      </Paper>

      {/* 팝업 부분 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.popup}>
          <Typography variant="h5" id="simple-modal-title">
            {result ? 'E-mail Found' : 'Error'}
          </Typography><br/>
          <Typography variant="body4" id="simple-modal-description">
            {result ? `이메일: ${result}` : error}
          </Typography>
            <Button onClick={handleClose} 
            style={{ marginTop: '20px', height:'40px' }} 
            variant="contained" 
            size='small'
            color="primary"
            fullWidth
            >닫기</Button>
        </div>
      </Modal>
    </div>
  );
};

export default FindEmail;
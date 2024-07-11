import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow, Grid, Button, ButtonGroup } from '@material-ui/core';
import axios from 'axios';
import Header from "../header/Header";
import Logo from "../../assets/images/logo_width.png";
import { Link } from "react-router-dom";
import Style from "../../Style";
import Styles from "./Style";
import { selectUserId } from '../../store/reducers/selectors'; // Redux 셀렉터 import
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';


const PersonalInfo = () => {
  const classes = Styles();
  const classes2 = Style();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector(selectUserId); // Redux에서 userId 가져오기
  const { displayName, photoURL, email } = useSelector((state) => state.user);


  useEffect(() => {
    const fetchData = async () => {
      const sheetId = '1iCCfFgbT43iVt0f_0cwUALr3i2-oLU8jn9brUc_3HMA';
      const apiKey = 'AIzaSyBP5KnUzW6BJaOgfeOjWA8RJhAiawg7Br0';

      console.log("Fetched userId from Redux session info:", email); // userId 값을 콘솔에 출력

      if (!email) {
        console.error('No userId found in session info');
        setLoading(false);
        return;
      }

      // B열에서 사용자 ID를 찾는 URL
      const urlB = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/ResultSheet!B:B?key=${apiKey}`;
      axios.get(urlB)
        .then(response => {
          const rows = response.data.values;
          const rowIndex = rows.findIndex(row => row[0] === email);
          if (rowIndex !== -1) {
            // A열에서 해당 행의 데이터를 가져오는 URL
            const urlA = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/ResultSheet!A${rowIndex + 1}?key=${apiKey}`;
            axios.get(urlA)
              .then(response => {
                setData(response.data.values);
                setLoading(false);
              })
              .catch(error => {
                console.error('Error fetching data from column A: ', error);
                setLoading(false);
              });
          } else {
            console.error(`UserId ${email} not found in column B`);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error('Error fetching data from column B: ', error);
          setLoading(false);
        });
    };

    fetchData();
  }, [email]);
  const navigate = useNavigate();
  const logout = () => {
    navigate('/');  
    auth.signOut();
  };

  return (
    <div>
      <Grid className={classes2.app}>
        <Grid item container className={classes2.app__header}>
          <Header />
        </Grid>
        <div className={classes.container}>
          <Grid item container className={classes.GptResult} xs={12} sm={12} md={12}>
            <Paper className={classes.root}>
              <div className={classes.gpt_root}>
                <div className={classes.gpt_logo}>
                  <img
                    src={Logo}
                    style={{ width: "300px", height: "100px", alignContent: "center" }}
                    alt="linked-in-logo"
                  />
                </div>
                <div className="info" style={{ textAlign: "center" }}>
                    <h4>{displayName}님 안녕하세요. </h4><br/>
                    오늘 하루도 즐거운 하루 되세요~<br/>
                    기존에 진행하신 AI맞춤 운동 추천 결과를 확인하실 수 있어요~<br/>
                </div>
                <Box display="flex" justifyContent="center" mt={4} className={classes.fullWidthButtonGroup}>
                  
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" className={classes.fullWidthButtonGroup}>
                    <Link to="/gptResult" className={classes.linkButton}>
                      <Button className={classes.gpt_button} style={{ minWidth: '100px' }}>😉 AI 맞춤 운동 추천 결과</Button>
                    </Link>
                    <Link to="/"className={classes.linkButton}>
                      <Button className={classes.gpt_button} style={{ minWidth: '180px' }} onClick={logout}>LogOut</Button>
                    </Link>
                  </ButtonGroup>
                  
                </Box>
               
                
              </div>
            </Paper>
          </Grid>
          
        </div>
      </Grid>
    </div>
  );
}

export default PersonalInfo;

import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import Header from "../header/Header";
import Logo from "../../assets/images/logo_width.png";
import { Link } from "react-router-dom";
import Style from "../../Style";
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const GptResult = () => {

  // src/Style 사용
  const classes = Style();

  //useState를 사용해서, data, loading 상태를 관리
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //Google Sheets API를 호출하고 데이터를 가져옴
  useEffect(() => {
    const sheetId = '1iCCfFgbT43iVt0f_0cwUALr3i2-oLU8jn9brUc_3HMA';
    const range = 'Result Sheet!A:A'; // 구글 시트에서 가져 올 범위지정
    const apiKey = 'AIzaSyBP5KnUzW6BJaOgfeOjWA8RJhAiawg7Br0';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    axios.get(url)

      // 데이터 가져오기 성공
      .then(response => { 
        console.log(response.data.values); // 데이터를 콘솔에 출력하여 확인
        const rows = response.data.values;
        if(rows.length > 0){ 
          setData([rows[rows.length-1]]); // 현재 행보다 -1 한걸 데이터에 담아줌
          //setData(rows);
        }
        setLoading(false);
      })

      //데이터 가져오기 실패
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  //랜더링
  return (

    <div>
    <Grid className={classes.app}>
      <Grid item container className={classes.app__header}>
        <Header />
         <div className="GptResult">
          <Paper className={classes.gpt_root} >
            <div className={classes.gpt_logo}>
                <img
                  src={Logo}
                  style={{ width: "300px", height: "100px", alignContent: "center" }}
                  alt="linked-in-logo"
                  />
            </div>
            <div id="data" className={classes.gpt_paper}>
              {loading ? (
                <div className={classes.loadingContainer}>
                  <CircularProgress />
                </div>
              ) : (
                data.length > 0 ? (
                  <TableContainer component={Paper} className={classes.gpt_paper}>
                    <div className={classes.divtable}>
                    <Table className={classes.gpt_table}>
                        <TableRow className={classes.gpt_tr}>
                          <TableCell className={classes.gpt_th}>
                            <h2>  Custpot 운동 추천 </h2>
                            </TableCell>
                        </TableRow>
                      <TableBody className={classes.gpt_tablebody}>
                        {data.map((row, rowIndex) => (
                          <TableRow key={rowIndex} className={classes.gpt_tr}>
                            {row.map((cell, cellIndex) => (
                              <TableCell key={cellIndex} className={classes.gpt_td}>{cell}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  </TableContainer>
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    No data available
                  </Typography>
                )
              )}
            </div>
            <br /><br /><br />


            {/* 버튼 이동-> 홈이랑, 맵 */}
            <ButtonGroup variant="contained" color="primary">
              <Link to="/App.js">
                <Button className={classes.gpt_button}>HOME</Button>
              </Link>
              <Link to="/about">
                <Button className={classes.gpt_button}>MAP</Button>
              </Link>
              </ButtonGroup>
      
          </Paper>
    </div>
      </Grid>
    </Grid>
  </div> 
  );
}

export default GptResult;
import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import Header from "../header/Header";
import Style from "./Style";
import Logo from "./../../assets/images/logo_width.png";
import { Link } from "react-router-dom";;


function GptResult() {

  const classes = Style();

  //useState를 사용해서, data, loading 상태를 관리
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //useEffect를 사용해서, Google Sheets API를 호출하고 데이터를 가져옵
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
          setData([rows[rows.length-1]]);
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
  return (
    <div className="GptResult">
      <Header />
      <Paper elevation={3} className={classes.root} >
        <div className={classes.logo}>
                <img
                  src={Logo}
                  style={{ width: "300px", height: "100px", alignContent: "center" }}
                  alt="linked-in-logo"
                  />
            </div>
        <Typography variant="h4" gutterBottom>
          Custpot 운동 추천
        </Typography>
        <div id="data" className={classes.gptdata_paper}>
          {loading ? (
            <div className={classes.loadingContainer}>
              <CircularProgress />
            </div>
          ) : (
            data.length > 0 ? (
              <TableContainer component={Paper} className={classes.tableContainer}>
                <div className={classes.divtable}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow className={classes.tr}>
                      <TableCell className={classes.th}>
                        <h2>Result</h2>
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.tablebody}>
                    {data.map((row, rowIndex) => (
                      <TableRow key={rowIndex} className={classes.tr}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex} className={classes.td}>{cell}</TableCell>
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
        <Link to="/App.js">
           <button className={classes.button}>뒤로가기</button>
         </Link>
      </Paper>
    </div>
  );
}

export default GptResult;
import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import Header from "../header/Header";
import Style from "./Style";
import Logo from "./../../assets/images/logo_width.png";
function GptResult() {

  const classes = Style();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const sheetId = '1iCCfFgbT43iVt0f_0cwUALr3i2-oLU8jn9brUc_3HMA';
    const apiKey = 'AIzaSyBP5KnUzW6BJaOgfeOjWA8RJhAiawg7Br0';
    const range = 'Result Sheet!A:A'; // 가져오고자 하는 범위(A열의 전체 범위)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    axios.get(url)
      .then(response => {
        console.log(response.data.values); // 데이터를 콘솔에 출력하여 확인
        const rows = response.data.values;
        if(rows.length>0){
          setData([rows[rows.length-1]]);
          //setData(rows);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="GptResult">
      <Header />
      <Paper className={classes.root}>
        <div className={classes.logo}>
                <img
                  src={Logo}
                  style={{ width: "300px", height: "150px", alignContent: "center" }}
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
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow className={classes.tr}>
                      <TableCell className={classes.th}>Data</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, rowIndex) => (
                      <TableRow key={rowIndex} className={classes.tr}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex} className={classes.td}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" color="textSecondary">
                No data available
              </Typography>
            )
          )}
        </div>
      </Paper>
    </div>
  );
}

export default GptResult;
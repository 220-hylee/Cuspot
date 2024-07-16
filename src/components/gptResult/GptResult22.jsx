import React, { useEffect, useState } from 'react';
import {
  Paper, Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer,
  TableRow, Grid, Button, ButtonGroup, makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Logo from "../../assets/images/logo_width.png";
import Style from "../../Style";
import Styles from "./Style";

const useStyles = makeStyles({
  // Add your custom styles here
});

const GptResult = () => {
  const classes = Styles();
  const classes2 = Style();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addDataToSheet = async (id) => {
    const sheetId = '1ecyazOxlyShPivuMocPheTT-QC5rjkBzenIB5s6CwbQ';
    const range = 'DB!A:A';
    const apiKey = 'AIzaSyBP5KnUzW6BJaOgfeOjWA8RJhAiawg7Br0';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&key=${apiKey}`;
    
    const values = [
      [id]
    ];

    try {
      const response = await axios.post(url, { values });
      console.log('Data added:', response.data);
      fetchData(); // 데이터를 추가한 후 다시 가져오기
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const fetchData = async () => {
    const sheetId = '1iCCfFgbT43iVt0f_0cwUALr3i2';
    const range = 'ResultSheet!B:B';
    const apiKey = 'AIzaSyBP5KnUzW6BJaOgfeOjWA8RJhAiawg7Br0';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const rows = response.data.values;
      if (rows.length > 0) {
        setData(rows);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('데이터를 가져오는 데 실패했습니다. 나중에 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  //searchForId: 이 함수는 Google Sheets에서 특정 ID를 검색하고 해당 ID의 데이터를 가져와서 상태를 업데이트
  const searchForId = async (id, columnName) => {
    const sheetId = '1iCCfFgbT43iVt0f_0cwUALr3i2';
    const range = 'Sheet1!A:Z'; // 전체 열 범위를 지정
    const apiKey = 'AIzaSyBP5KnUzW6BJaOgfeOjWA8RJhAiawg7Br0';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const rows = response.data.values;
      if (rows.length > 0) {
        const headerRow = rows[0];
        const columnIndex = headerRow.indexOf(columnName);
        const foundRow = rows.find(row => row.includes(id));
        if (foundRow && columnIndex > -1) {
          setData([foundRow[columnIndex]]);
        } else {
          setData([]);
        }
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error searching for ID:', error);
      setError('ID를 검색하는 데 실패했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Grid className={classes2.app}>
        <Grid item container className={classes2.app__header}>
          <Header />
        </Grid>
        <div className={classes.container}>
          <Grid item container className={classes.GptResult} xs={12} sm={8} md={6}>
            <Paper className={classes.root}>
              <div className={classes.gpt_root}>
                <div className={classes.gpt_logo}>
                  <img
                    src={Logo}
                    style={{ width: "300px", height: "100px", alignContent: "center" }}
                    alt="logo"
                  />
                </div>
                <div id="data" className={classes.gpt_paper}>
                  {loading ? (
                    <div className={classes.loadingContainer}>
                      <CircularProgress />
                    </div>
                  ) : error ? (
                    <Typography variant="body1" color="error">
                      {error}
                    </Typography>
                  ) : data.length > 0 ? (
                    <TableContainer component={Paper} className={classes.gpt_tableContainer}>
                      <Table className={classes.gpt_table}>
                        <TableRow className={classes.gpt_tr}>
                          <TableCell className={classes.gpt_th}>
                            <h2>Custpot 운동 추천</h2>
                          </TableCell>
                        </TableRow>
                        <TableBody className={classes.gpt_tablebody}>
                          {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex} className={classes.gpt_tr}>
                              <TableCell className={classes.gpt_td}>{row}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      사용 가능한 데이터가 없습니다.
                    </Typography>
                  )}
                </div>
                <Box display="flex" justifyContent="center" mt={4} className={classes.fullWidthButtonGroup}>
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Link to="/chat" className={classes.linkButton}>
                      <Button className={classes.gpt_button} style={{ minWidth: '140px' }}>😉 CHAT</Button>
                    </Link>
                    <Link to="/about=" className={classes.linkButton}>
                      <Button className={classes.gpt_button} style={{ minWidth: '140px' }}>🗺️ MAP</Button>
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
};

export default GptResult;

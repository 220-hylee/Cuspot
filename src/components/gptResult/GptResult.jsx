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


const GptResult = () => {
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
          <Grid item container className={classes.GptResult} xs={12} sm={8} md={6}>
            <Paper className={classes.root}>
              <div className={classes.gpt_root}>
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
                                {row.map((cell, cellIndex) => (
                                  <TableCell key={cellIndex} className={classes.gpt_td}>{cell}</TableCell>
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
                <Box display="flex" justifyContent="center" mt={4} className={classes.fullWidthButtonGroup}>
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" className={classes.fullWidthButtonGroup}>
                    <Link to="/chat" className={classes.linkButton}>
                      <Button className={classes.gpt_button} style={{ minWidth: '100px' }}>😉 CHAT</Button>
                    </Link>
                    <Link to="/about" className={classes.linkButton}>
                      <Button className={classes.gpt_button} style={{ minWidth: '180px' }}>🗺️ MAP</Button>
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

export default GptResult;



//--------------------old-----------------------
// import React, { useEffect, useState } from 'react';
// import { Paper, Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles } from '@material-ui/core';
// import axios from 'axios';
// import Header from "../header/Header";
// import Logo from "../../assets/images/logo_width.png";
// import { Link } from "react-router-dom";
// import Style from "../../Style";
// import Styles from "./Style";
// import { Grid } from "@material-ui/core";
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// // import "../../style.css";

// const GptResult = () => {

//   // src/Style 사용
//   const classes = Styles();

//   const classes2 = Style();
//   // const classes2 = Style();
//   //useState를 사용해서, data, loading 상태를 관리
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   //Google Sheets API를 호출하고 데이터를 가져옴
//   useEffect(() => {
//     const sheetId = '1iCCfFgbT43iVt0f_0cwUALr3i2-oLU8jn9brUc_3HMA';
//     const range = 'ResultSheet!A:A'; // 구글 시트에서 가져 올 범위지정
//     const apiKey = 'AIzaSyBP5KnUzW6BJaOgfeOjWA8RJhAiawg7Br0';

//     const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
//     axios.get(url)

//       // 데이터 가져오기 성공
//       .then(response => { 
//         console.log(response.data.values); // 데이터를 콘솔에 출력하여 확인
//         const rows = response.data.values;
//         if(rows.length > 0){ 
//           setData([rows[rows.length-1]]); // 현재 행보다 -1 한걸 데이터에 담아줌
//           //setData(rows);
//         }
//         setLoading(false);
//       })

//       //데이터 가져오기 실패
//       .catch(error => {
//         console.error('Error fetching data: ', error);
//         setLoading(false);
//       });
//   }, []);

//   //랜더링
//   return (
//     <div>
//       <Grid className={classes2.app}>
//         <Grid item container className={classes2.app__header}>
//           <Header />
//         </Grid>
//       {/* gpt결과지*/}
//       <div className={classes.container}>
//       {/* <Grid item container className={classes.body__feed} xs={12} sm={8} md={6}> */}
//       <Grid item container className={classes.GptResult} xs={12} sm={8} md={6}>
//          {/* <div className="GptResult"> */}
//           <Paper className={classes.root} >
//       {/* 고정 */}
//           <div className={classes.gpt_root}> 
//             {/* 이미지 로고 */}
//             <div className={classes.gpt_logo}>
//                 <img
//                   src={Logo}
//                   style={{ width: "300px", height: "100px", alignContent: "center" }}
//                   alt="linked-in-logo"
//                   />
//             </div>
//             {/* 테이블 감싸는 구역 */}
//             <div id="data" className={classes.gpt_paper}>
//               {loading ? (
//                 <div className={classes.loadingContainer}>
//                   <CircularProgress />
//                 </div>
//               ) : (
//                 data.length > 0 ? ( // 데이터가 있을 경우
//                   <TableContainer component={Paper} className={classes.gpt_tableContainer}>
//                     <Table className={classes.gpt_table}>
//                         <TableRow className={classes.gpt_tr}>
//                           <TableCell className={classes.gpt_th}>
//                             <h2>  Custpot 운동 추천 </h2>
//                           </TableCell>
//                         </TableRow>
//                       <TableBody className={classes.gpt_tablebody}>
//                         {data.map((row, rowIndex) => (
//                           <TableRow key={rowIndex} className={classes.gpt_tr}>
//                             {row.map((cell, cellIndex) => (
//                               <TableCell key={cellIndex} className={classes.gpt_td}>{cell}</TableCell>
//                             ))}
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 ) : (
//                   <Typography variant="body1" color="textSecondary">
//                     No data available
//                   </Typography>
//                 )
//               )}
//             {/* 버튼 이동-> 홈이랑, 맵 */}
//             </div>
//             <Box display="flex" justifyContent="center" mt={4}
//             className={classes.fullWidthButtonGroup}>
//               <ButtonGroup variant="contained" color="primary" 
//                 aria-label="contained primary button group"
//                 className={classes.fullWidthButtonGroup}>
//                 <Link to="/chat" className={classes.linkButton}>
//                   <Button className={classes.gpt_button} style={{ minWidth: '100px' }}>😉 CHAT</Button>
//                 </Link>
//                 <Link to="/about" className={classes.linkButton}>
//                   <Button className={classes.gpt_button} style={{ minWidth: '180px' }}>🗺️ MAP</Button>
//                 </Link>
//               </ButtonGroup>
//             </Box>
//           </div>
//           </Paper>
//     {/* </div> */}
//         </Grid>
//   </div>
//   </Grid>
//   </div> 
//   );
// }

// export default GptResult;
import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Style from '../../Style'; // 스타일 import
import Header from '../header/Header'; // 헤더 컴포넌트 import
import Contacts from '../contacts/Contacts';

// import Contacts from './Contacts'; // Contacts 컴포넌트 import

const Friends = () => {
  const classes = Style();

  // useEffect(() => {
  //   // GitpleChat 스크립트를 로드하고 초기화
  //   const script = document.createElement('script');
  //   script.src = 'https://app.gitple.io/inapp-web/gitple-loader.js';
  //   script.async = true;
  //   script.onload = () => {
  //     // 스크립트 로드 완료 후 gitple 초기화
  //     if (window.gitple) {
  //       window.gitple('boot', {
  //         apiKey: 'G7qJfFaCWBYX7XEOPExHBV7QRs6g13'
  //       });
  //     }
  //   };

  //   document.body.appendChild(script);

  //   return () => {
  //     // 컴포넌트가 언마운트될 때 GitpleChat 제거
  //     if (window.gitple) {
  //       window.gitple('destroy');
  //     }
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div>
      <Grid className={classes.app}>
        <Grid item container className={classes.app__header}>
          <Header />
        </Grid>
        <Grid item container className={classes.body__friend} md={12}>
          {/* <Sidebar /> */}
          <Contacts/>
        
        </Grid>
      </Grid>
   </div>
  );
};

export default Friends;



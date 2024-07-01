import React from "react";
import Style from "../../Style";
import { Box, Container, Grid } from "@material-ui/core";
import Header from "../header/Header";
import KakaoMap from "./component/KakaoMap";


const Map = () => {
  const styles = Style();
  return (
    <div>
      <Grid className={styles.app}>
        <Grid item container className={styles.app__header} >
          <Header />
          <KakaoMap/>   
        </Grid>
      
      </Grid>
      <h2></h2>
      
    </div>
  );
};

export default Map;

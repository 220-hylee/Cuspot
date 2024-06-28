// CusMap.jsx

import React from "react";
import Style from "../../Style";
import { Grid } from "@material-ui/core";
import Header from "../header/Header";
import KakaoMap from "./component/KakaoMap";

const CusMap = () => {
  const classes = Style();
  return (
    <div>
      <Grid className={classes.app}>
        <Grid item container className={classes.app__header}>
          <Header />
        </Grid>
      </Grid>

      <h2></h2>
      <KakaoMap />
    </div>
  );
};

export default CusMap;

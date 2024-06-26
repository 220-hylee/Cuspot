import React from "react";
import Style from "../../Style";
import { Grid } from "@material-ui/core";
import Header from "../header/Header";

const GroupChat = () => {
  const classes = Style();
  return (
    <div>
      <Grid className={classes.app}>
        <Grid item container className={classes.app__header}>
          <Header />
        </Grid>
      </Grid>

      <h2> hello Chat </h2>
    </div>
  );
};

export default GroupChat;

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
          <object data="http://localhost:3001" width="100%" height="870px">
          </object>       
        </Grid>
           
      </Grid>
      
    </div>
  );
};

export default GroupChat;

import React from "react";
import Style from "../../Style";
import { Grid } from "@material-ui/core";
import Header from "../header/Header";
import Contacts from "../contacts/Contacts";

const Friends = () => {
  const classes = Style();
  return (
    <div>
      <Grid className={classes.app}>
        <Grid item container className={classes.app__header}>
          <Header />
        </Grid>
        <Grid item container className={classes.body__friend} md={12}>
            {/* <Sidebar /> */}
            <Contacts />
          </Grid>
      </Grid>

     
    </div>
  );
};

export default Friends;

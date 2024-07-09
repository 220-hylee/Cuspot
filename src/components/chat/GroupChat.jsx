import React, { useEffect, useRef, useState } from "react";
import Style from "../../Style";
import { Grid } from "@material-ui/core";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import { auth } from '../../firebase';

const GroupChat = () => {
  const { displayName, photoURL } = useSelector((state) => state.user);
  const classes = Style();
  const [userId, setUserId] = useState(null);
  const [user,setUser] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ userId: user.uid, displayName: user.displayName });
      } else {
        setUser({ userId: null, displayName: null });
      }
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <div>
      <Grid className={classes.app}>
        <Grid item container className={classes.app__header}>
          <Header />
          <object data="https://chat-9eb84.web.app/" width="100%" height="870px">
          </object>       
        </Grid>
           
      </Grid>
      
    </div>
  );
};

export default GroupChat;

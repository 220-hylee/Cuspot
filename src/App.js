import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Hidden, Paper } from "@material-ui/core";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Login from "./components/login/Login";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Contacts from "./components/contacts/Contacts";
import Stories from "./components/stories/Stories";
import Form from "./components/form/Form";
import Posts from "./components/posts/Posts";
import CusMap from "./components/map/CusMap"; // 맵 컴포넌트
import Chat from "./components/chat/GroupChat";
import Friends from "./components/friends/Friends";
import { LoginAction, LogoutAction } from "./store/actions/auth";
import { auth } from "./firebase";
import { lightPrimary } from "./assets/Colors";
import Style from "./Style";
import Register from "./components/login/Register";

const MainContent = () => {
  const classes = Style();

  return (
    <Grid className={classes.app}>
      <Grid item container className={classes.app__header}>
        <Header />
      </Grid>
      <Grid item container className={classes.app__body}>
        { <Hidden smDown>
          <Grid item container className={classes.body__left} md={3}>
            {/* <Sidebar /> */}
            <Contacts />
          </Grid>
        </Hidden> }
        <Grid item container className={classes.body__feed} xs={12} sm={8} md={6}>
          {/* <Grid item container className={classes.feed__stories}>
            <Stories />
          </Grid> */}
          <Grid item container className={classes.feed__form}>
            <Form />
          </Grid>
          <Grid item container className={classes.feed__posts}>
            <Posts />
          </Grid>
        </Grid>
        {/* <Hidden smDown>
          <Grid item container className={classes.body__right} md={3}>
            <Contacts />
          </Grid>
        </Hidden> */}
      </Grid>
    </Grid>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.user);
  const mode = useSelector((state) => state.util);

  const muiTheme = createMuiTheme({
    palette: {
      type: mode ? "dark" : "light",
    },
  });

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(LoginAction(authUser));
      } else {
        dispatch(LogoutAction());
      }
    });
  }, [dispatch]);

  const classes = Style();

  return (
    <Router>
      <ThemeProvider theme={muiTheme}>
        <Paper
          elevation={0}
          className={classes.root}
          style={{ backgroundColor: !mode && lightPrimary }}
        >
          {!displayName ? (
            <Routes>
            <Route path="/" element={<Login />}/>
           <Route path="/register" element={<Register />}/>
      </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/about" element={<CusMap />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="*" element={<Navigate to="/" />} />
              
              <Route path="gitplechat" element={<useGoogleSheet />} />
            </Routes>
          )}
        </Paper>
      </ThemeProvider>
    </Router>
  );
};

export default App;


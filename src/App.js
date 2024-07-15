import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Hidden, Paper } from "@material-ui/core";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Login from "./components/login/Login";
import GptResult from "./components/gptResult/GptResult";
import Register from "./components/login/Register";
import FindPassword from './components/login/FindPassword';
import FindEmail from './components/login/FindEmail';

import Header from "./components/header/Header";

import Category from "./components/category/category"
import Sidebar from "./components/sidebar/Sidebar";

import Contacts from "./components/contacts/Contacts";
import Form from "./components/form/Form";
import Posts from "./components/posts/Posts";
import CusMap from "./components/map/CusMap"; // 맵 컴포넌트
import Chat from "./components/chat/GroupChat";
import Friends from "./components/friends/Friends";
import PersonalInfo from "./components/personalInfo/personalInfo";
import { LoginAction, LogoutAction } from "./store/actions/auth";
import { auth } from "./firebase";
import { lightPrimary } from "./assets/Colors";
import Style from "./Style";

const MainContent = () => {
  const classes = Style();

  return (
    <Grid className={classes.app}>
      <Grid item container className={classes.app__header}>
        <Header />
      </Grid>
      <Grid item container className={classes.app__header}>
        <Category />
      </Grid>
      <Grid item container className={classes.app__body}>
        <Hidden smDown>
          <Grid item container className={classes.body__left} md={3}>
            {/* <Contacts /> */}
          </Grid>
        </Hidden>
        <Grid item container className={classes.body__feed} xs={12} sm={8} md={6}>
          <Grid item container className={classes.feed__form}>
            <Form />
          </Grid>
          <Grid item container className={classes.feed__posts}>
            <Posts />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

// 깃플챗 스크립트를 로드하는 커스텀 훅
const usePageViews = () => {
  const location = useLocation();
  useEffect(() => {
    let script;
    if (location.pathname === '/') {
      script = document.createElement('script');
      script.src = 'https://app.gitple.io/inapp-web/gitple-loader.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.GitpleConfig = {"appCode":"G7qJfFaCWBYX7XEOPExHBV7QRs6g13"};
        window.Gitple('boot');
      };
    }

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [location]);
};

const GitpleScriptLoader = () => {
  usePageViews();
  return null;
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
          {displayName ? (
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/about" element={<CusMap />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/GptResult" element={<GptResult />} />
              <Route path="/PersonalInfo" element={<PersonalInfo />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/findEmail" element={<FindEmail />} />
              <Route path="/findPassword" element={<FindPassword />} />
            </Routes>
          )}
          <GitpleScriptLoader />
        </Paper>
      </ThemeProvider>
    </Router>
  );
};

export default App;

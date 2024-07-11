import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Hidden, Avatar, Tooltip, Paper, Badge } from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";

// import { HomeRounded } from "@material-ui/icons"; // 메인화면
// import { PlayCircleFilledWhiteRounded } from "@material-ui/icons"; // 맵
// import { SupervisedUserCircleRounded } from "@material-ui/icons"; // 챗
// import TelegramIcon from "@material-ui/icons/Telegram"; // 친구
// import { StoreMallDirectoryOutlined } from "@material-ui/icons";
// import Brightness4Icon from "@material-ui/icons/Brightness4";
// import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
// import NavigationRoundedIcon from '@material-ui/icons/NavigationRounded';
import DirectionsRoundedIcon from '@material-ui/icons/DirectionsRounded';
import SmsRoundedIcon from '@material-ui/icons/SmsRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';


import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import logo from "../../assets/images/logoFull.png";
import { ToggleTheme } from "../../store/actions/util";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import Style from "./Style";


const Header = () => {
  const classes = Style();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.util);
  const { photoURL } = useSelector((state) => state.user);
  const changeTheme = () => {
    dispatch(ToggleTheme());
  };
  const logout = () => {
    navigate('/');  
    auth.signOut();
  };
  const navigate = useNavigate();
  const handleMapClick = () => {
    navigate('/about');  // 클릭하면 '/about' 페이지로 이동
  };
  const handleHomeClick = () => {
    navigate('/');  
  };
  const handleGroupChatClick = () => {
    navigate('/chat'); 
  };
  const handleFriendsClick = () => {
    navigate('/friends'); 
  };
  const handleAddClick = () => {
    navigate('/PersonalInfo');  
  };
  return (
    <Paper elevation={0} style={{ borderRadius: 0, width: "100%", height: "100%"}}>
      <Grid container className={classes.header}>
        {/*----Logo & Search icon--------*/}
        <Hidden xsDown>
          <Grid item className={classes.header__logo} sm={2} md={3}>
            <img className={classes.logo__image} src={logo} alt="cuspot-logo" />
            {/* <Hidden smDown>
              <div className={classes.logo__search}>
                <SearchIcon />
                <input placeholder="search ... " />
              </div>
            </Hidden> */}
          </Grid>
        </Hidden>
        {/*----Nav-Bar--------*/}
        <Grid item className={classes.header__nav} xs={12} sm={8} md={6}>
          <div className={`${classes.nav__links} ${classes.nav__links__specail}`}>
            <Avatar src={logo} />
          </div>
          <div className={classes.nav__links} onClick={handleHomeClick}>
            <HomeRoundedIcon />
          </div>
          <div className={classes.nav__links} onClick={handleMapClick}>
            <DirectionsRoundedIcon />
          </div>
            <div className={classes.nav__links} onClick={handleGroupChatClick}>
              <SmsRoundedIcon />
            </div>
          {/* <Hidden xsDown>
            {/* <div className={classes.nav__links}>
              <StoreMallDirectoryOutlined />
            </div> 
          </Hidden> */}
            <div className={classes.nav__links} onClick={handleFriendsClick}>
              <PeopleRoundedIcon />
            </div>
          {/* <div className={classes.nav__links} onClick={changeTheme}>
            {mode ? <Brightness4Icon /> : <BrightnessHighIcon />}
          </div> */}
          <div className={`${classes.nav__links} ${classes.nav__links__specail}`}>
            <Avatar src={photoURL} onClick={handleAddClick} />
          </div>
        </Grid>

        {/*----Userinfo and options--------*/}
        <Hidden xsDown>
          <Grid item className={classes.header__userinfo} sm={2} md={3}>
            
            <Hidden smDown>
              <div className={classes.userinfo__options}>
                {/* <AddIcon  onClick={handleAddClick}/> */}
                {/* <PeopleRoundedIcon /> */}
                {/* <Badge badgeContent={10} max={9} {...defaultProps} /> */}
                {/* <ArrowDropDownRoundedIcon /> */}
              </div>
            </Hidden>
            <Tooltip
              placement="left"
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 300 }}
              title={"프로필"}
              arrow
            >
              <Avatar src={photoURL} onClick={handleAddClick} />
            </Tooltip>
          </Grid>
        </Hidden>
      </Grid>
    </Paper>
  );
};
const defaultProps = {
  color: "secondary",
  children: <NotificationsNoneOutlinedIcon />,
};
export default Header;
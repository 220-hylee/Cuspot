import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlayCircleFilledWhiteOutlined from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import useStyles from '../styles';

const Nav = () => {
  const classes = useStyles();
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleIconClick = () => {
    navigate('/about'); // 클릭하면 '/about' 페이지로 이동
  };

  return (
    <nav className={classes.nav}>
      <div className={classes.nav__links} onClick={handleIconClick}>
        <PlayCircleFilledWhiteOutlined />
      </div>
      <a href="/" className={classes.nav__links}>Home</a>
      <a href="/about" className={classes.nav__links}>About</a>
      <a href="/contact" className={classes.nav__links}>Contact</a>
    </nav>
  );
};

export default Nav;
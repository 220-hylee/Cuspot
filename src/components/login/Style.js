import { makeStyles } from "@material-ui/core/styles";
import { cuspotBlue, darkSecondary, darkPrimary } from "../../assets/Colors";

export default makeStyles((theme) => ({

  login__container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    minHeight: '100vh',
    padding: theme.spacing(4), // Unified vertical padding
    // paddingBottom: theme.spacing(4), // Unified vertical padding
  },
  
  login: {
    minWidth: 450,
    maxWidth: 450,
    height: 570,
    padding: theme.spacing(4), // Unified vertical padding
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
    },
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    "& > *": {},
  },
  "& > .firebaseui-idp-button": {
    width: 200,
  },

  register: {
    minWidth: 450,
    maxWidth: 450,
    height: 570,
    padding: theme.spacing(4), // Unified vertical padding
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
    },
    width: '100%',
  
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    "& > *": {},
  },
  
  register__container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: theme.spacing(4), // Unified vertical padding
  },

  register: {
    minWidth: 400,
    maxWidth: 400,
    // height: '100vh',
    padding: theme.spacing(2), // Unified vertical padding
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    "& > *": {},
  },


  linkContainer: {
    display: 'flex',
    justifyContent: 'space-between', // Adjust this as per your requirement
    gap: '15px', // 링크 사이 간격
  },
  login_link: {
    textDecoration: 'none',
    color: 'inherit', // Adjust this as needed
    // Additional styling for your links
  },
  logo: {
    width: "100%",
    paddingTop: 0,
    paddingBottom: 30,
    // Additional styling for your logo
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // margin: '10px 0',
    "& > img": {
      height: 35,
    },
    "& > h4": {
      display: "none",
      color: "#0057ae",
      fontSize: 40,
      fontWeight: 800,
      marginLeft: 10,
    },
  },
  signUp : {
    textAlign: "center",

  },

  //폼 창 관리

  // form_register : {
  //   width: 250,
  //   height: 200,
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "space-evenly",
  //   //로그인 버튼
  //   "& > Button": {
  //     height: 30,
  //     border: "1px solid lightgrey",
  //     borderRadius: 4,
  //     color: "white",
  //     fontSize: 14,
  //     fontWeight: 600,
  //     backgroundColor: cuspotBlue,
  //   },
  // },
  
  form: {
    width: 250,
    height: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  form_register: {
    width: 250,
    height: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  //버튼 관리 
  loginBt : {
    width: '100%',
    fontSize: '15',
    fontWeight : 'bold',
  },

  findEmail_bt : {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    fontSize: '15',
    fontWeight : 'bold',
  },
  // 회원가입 버튼
  // Button: {
  //   width:250,  
  //   height: 30,
  //   border: "1px solid lightgrey",
  //   borderRadius: 4,
  //   color: "white",
  //   fontSize: 14,
  //   fontWeight: 600,
  //   backgroundColor: cuspotBlue,
  //   },


  //
    google: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // padding: "0px 0",
      "& > section": {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 10px",
        "& > div": {
          flex: 1,
          width: "100%",
          height: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "lightgrey",
          opacity: 0.5,
        },
        "& > p": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 10px",
          fontSize: 12,
          color: "grey",
        },
      },
    },


    // [링크 모음]
    login_link :{
      color: "cuspotBlue",
      textDecoration: "underline",
      cursor: "pointer",
      paddingTop: "10px",
    },
     Register_link : {
      color: "cuspotBlue",
      textAlign:"Left",
      textDecoration: "underline",
      cursor: "pointer",
      padding: "10px 10px 0px 10px",
  },
     register_link : {
      color: "cuspotBlue",
      textAlign:"Left",
      textDecoration: "underline",
      cursor: "pointer",
      padding: "10px 10px 0px 10px",
  },

  about: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop : "10px",
    "& > section": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 10px",
      marginBottom: 5,
      "& > div": {
        flex: 1,
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgrey",
        opacity: 0.5,
      },
      "& > p": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 10px 10px 10px",
        fontSize: 10,
        color: "grey",
      },
    },
    "& > div": {
      flex: 1,
      width: "100%",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      margin: "4px 0",
      "& > a": {
        color: "grey",
        transition: "all 0.4s ease",
        "&:hover": {
          color: theme.palette.type === "dark" ? darkSecondary : darkPrimary,
        },
        "& > .MuiSvgIcon-root": {
          fontSize: 18,
        },
      },
    },
  },

  searchEmail_form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
  repasswordSorry: {
    display: 'flex',
    width: '400px',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    textAlign: 'center',
    fontSize: '7px'
  },

  findEmail : {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },


  email_result : {
    textDecoration : 'underline',
    fontSize : 12,
    paddingBlock : 20,
    
  },

  link_back : {
    marginTop :0,
    // fontWeight : 600,
    // fontSize : 14,
  },

  popup : {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 200,
  backgroundColor: 'white',
  borderRadius : '10px',
  padding: '32px',
  // padding: '16px 32px 24px'
  }  
}));

import { makeStyles } from "@material-ui/core/styles";
import { FacebookBlue, darkSecondary, darkPrimary } from "../../assets/Colors";

export default makeStyles((theme) => ({
  login__container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    minWidth: 400,
    maxWidth: 400,
    height: 500,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 20,
      paddingBottom: 5,
      width: "100%",
      height: "100%",
      borderRadius: 0,
      border: 0,
      boxShadow: "none",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    "& > *": {},
  },
  "& > .firebaseui-idp-button": {
    width: 200,
  },
  logo: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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

  form: {
    width: 250,
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    "& > input": {
      outlineWidth: 0,
      height: 35,
      border: "1px solid lightgrey",
      borderRadius: 2,
      padding: "0 10px",
    },
    "& > button": {
      height: 30,
      border: "1px solid lightgrey",
      borderRadius: 4,
      color: "white",
      fontSize: 14,
      fontWeight: 600,
      backgroundColor: FacebookBlue,
    },
  },

  // 회원가입 버튼
  button: {
    width:250,  
    height: 30,
      border: "1px solid lightgrey",
      borderRadius: 4,
      color: "white",
      fontSize: 14,
      fontWeight: 600,
      backgroundColor: FacebookBlue,
    },

  google: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& > section": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 10px",
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
        padding: "0 10px",
        fontSize: 12,
        color: "grey",
      },
    },
  },

  about: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
        padding: "0 10px",
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
}));

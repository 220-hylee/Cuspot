import { makeStyles } from "@material-ui/core/styles";
import { lightPrimary } from "../../assets/Colors";
import { darkPrimary, darkSecondary, cuspotBlue, textDark } from "../../assets/Colors";


export default makeStyles((theme) => ({
  
  header__form: {
    flex: 1,
    height: "50%",
    display: "flex",
    alignItems: "center",
    marginLeft: 10,
    borderRadius: 999,
    backgroundColor: theme.palette.type === "dark" ? darkSecondary : "#F3F3F3",
    overflow: "hidden",
    [theme.palette.type === "light"]: {},
    "& > input": {
      height: "100%",
      flex: 1,
      border: 0,
      outlineWidth: 0,
      paddingLeft: 15,
      color: theme.palette.type === "dark" && "lightgrey",
      fontSize: 14,
      // fontWeight: 600,
      backgroundColor: "transparent",
      "&::placeholder": {
        // fontWeight: 600,
        fontSize: 15,
        color: theme.palette.type === "dark" && textDark,
        [theme.breakpoints.down("xs")]: {
          fontWeight: 600,
          fontSize: 12,
        },
      },
    },
  
  },
  
  
  contacts: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 8,
    borderRadius: 0,
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: theme.palette.type === "light" && lightPrimary,
  },
  contacts__tab: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    "& > h4": {
      flex: 1,
    },
    "& > .MuiSvgIcon-root": {
      marginLeft: 10,
      cursor: "pointer",
    },
  },
  
}));

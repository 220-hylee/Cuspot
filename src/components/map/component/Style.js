import { makeStyles } from "@material-ui/core/styles";
import { darkSecondary } from "../../../assets/Colors";


export default makeStyles((theme) => ({
  
  search__bar: {
    flex: 1,
    height: "100%",
    display: "flex",
    padding: 10,
    borderRadius: 999,
    marginLeft:10,
    backgroundColor: theme.palette.type === "dark" ? darkSecondary : "#F3F3F3",
  
  },
  
  
}));

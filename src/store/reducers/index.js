import { combineReducers } from "redux";
import user from "./user";
import util from "./util";
import session from "./session";

export default combineReducers({
  user,
  util,
  session,
});

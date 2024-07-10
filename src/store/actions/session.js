export const SET_SESSION_INFO = "SET_SESSION_INFO";

export const setSessionInfo = (info) =>  async(dispatch) => {
  dispatch({
    type: SET_SESSION_INFO,
    payload: info,
  });

};

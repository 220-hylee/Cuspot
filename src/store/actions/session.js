export const SET_SESSION_INFO = "SET_SESSION_INFO";

export const setSessionInfo = (info) => ({
  type: SET_SESSION_INFO,
  payload: info,
});

export const loginUser = (user) => (dispatch) => {
  const userInfo = {
    userId: user.uid,
    email: user.email,
    // 다른 필요한 사용자 정보
  };
  dispatch(setSessionInfo(userInfo));
};
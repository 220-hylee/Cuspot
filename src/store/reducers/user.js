const initialState = {
  photoURL: null,
  // 다른 초기 상태 값들
};


const user = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};

export default user;

const initialState = {
  photoURL: null,
  userId: null,
  email: null,
  displayName: null,
  // 다른 초기 상태 값들
};


const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};


export default user;

import { SET_SESSION_INFO } from "../actions/session";

const initialState = {
  info: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION_INFO:
      return {
        ...state,
        info: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
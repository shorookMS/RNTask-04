import * as actionTypes from "../actions/types";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: {}
      };
    default:
      return state;
  }
};

export default reducer;

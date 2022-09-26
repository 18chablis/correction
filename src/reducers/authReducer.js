import {
  AUTH_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from "../actions/auth.action";

const initialState = {
  user: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: "redirecting to dashboard",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: "redirecting to dashboard",
      };
    case AUTH_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        user: action.res,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: action.res,
      };
    default:
      return state;
  }
}

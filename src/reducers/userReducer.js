import { GET_USER, GET_USERS } from "../actions/user.action";

const initialState = {
  users: [],
  user: {},
  loading: false,
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

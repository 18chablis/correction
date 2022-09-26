import { ADD_CAR_FAIL } from "../actions/car.action";
import {
  ADD_CLIENT_FAIL,
  CLIENT_LOADING_ERRORS,
  GET_CLIENTS_ERRORS,
  GET_CLIENT_BY_NAME_FAIL,
} from "../actions/client.action";
const initialState = {
  message: "",
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS_ERRORS:
      return {
        message: action.payload,
      };
    case GET_CLIENT_BY_NAME_FAIL:
      return {
        message: action.payload,
      };
    case ADD_CLIENT_FAIL:
      return {
        message: action.payload,
      };
    case ADD_CAR_FAIL:
      return {
        message: action.payload,
      };
    case CLIENT_LOADING_ERRORS:
      return {
        message: action.payload,
      };
    default:
      return state;
  }
}

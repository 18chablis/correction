import {
  ADD_ORDER_FORKLIFT,
  UPDATE_ORDER_FORKLIFT,
} from "../actions/forklift.action";

const initialState = {
  orders: [],
  savedForklift: false
};

export default function forkliftReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER_FORKLIFT:
    case UPDATE_ORDER_FORKLIFT:
     return {
       ...state,
       orders: action.payload,
       savedForklift: true,
     };
    default:
      return state;
  }
}

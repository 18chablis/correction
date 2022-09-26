import { ADD_ORDER_RAMP, UPDATE_ORDER_RAMP } from "../actions/ramp.action";

const initialState = {
  orders: [],
  savedRamp: false,
};

export default function rampReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER_RAMP:
    case UPDATE_ORDER_RAMP:
      return {
        ...state,
        orders: action.payload,
        savedRamp: true,
      };
    default:
      return state;
  }
}

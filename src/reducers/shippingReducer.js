import {
  ADD_ORDER_SHIPPING,
  UPDATE_ORDER_SHIPPING,
} from "../actions/shipping.action";

const initialState = {
  orders: [],
  savedShipping: false
};

export default function shippingReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER_SHIPPING:
    case UPDATE_ORDER_SHIPPING:
      return {
        ...state,
        orders: action.payload,
        savedShipping: true,
      };
    default:
      return state;
  }
}

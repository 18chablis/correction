import {
  ADD_ORDER_CAR_PARKING,
  UPDATE_ORDER_CAR_PARKING,
} from "../actions/carParking.action";

const initialState = {
  orders: [],
  savedCarParking: false
};

export default function carParkingReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER_CAR_PARKING:
    case UPDATE_ORDER_CAR_PARKING:
      return {
        ...state,
        orders: action.payload,
        savedCarParking: true,
      };
    default:
      return state;
  }
}

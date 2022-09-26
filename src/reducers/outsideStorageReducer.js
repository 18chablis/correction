import {
  ADD_ORDER_OUTSIDE_STORAGE,
  UPDATE_ORDER_OUTSIDE_STORAGE,
} from "../actions/outsideStorage.action";

const initialState = {
  orders: [],
  savedOutsideStorage: false
};

export default function outsideStorageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER_OUTSIDE_STORAGE:
    case UPDATE_ORDER_OUTSIDE_STORAGE:
      return {
        ...state,
        orders: action.payload,
        savedOutsideStorage: true,
      };
    default:
      return state;
  }
}

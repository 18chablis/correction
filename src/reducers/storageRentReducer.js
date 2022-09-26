import {
  ADD_ORDER_STORAGE_RENT,
  UPDATE_ORDER_STORAGE_RENT,
} from "../actions/storageRent.action";

const initialState = {
  orders: [],
  savedStorageRent:false
};

export default function storageRentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER_STORAGE_RENT:
    case UPDATE_ORDER_STORAGE_RENT:
      return {
        ...state,
        orders: action.payload,
        savedStorageRent: true,
      };
    default:
      return state;
  }
}

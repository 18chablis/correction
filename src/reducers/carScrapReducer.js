import {
  ADD_ORDER_CAR_SCRAP,
  UPDATE_ORDER_CAR_SCRAP,
} from "../actions/carScrap.action";

const initialState = {
  orders: [],
  savedCarScrap: false
};

export default function carScrapReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER_CAR_SCRAP:
    case UPDATE_ORDER_CAR_SCRAP:
      return {
        ...state,
        orders: action.payload,
        savedCarScrap: true,
      };
    default:
      return state;
  }
}

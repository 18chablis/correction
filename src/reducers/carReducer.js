import {
  ADD_CAR,
  CAR_LOADING,
  GET_CAR,
  GET_CAR_IMAGE,
  SEARCH_CLIENT,
  SEARCH_ORDER_DATE,
  SHOW_CARS_SHIPPING,
  SHOW_CARS_SCRAP,
} from "../actions/car.action";

const initialState = {
  cars: [],
  clients: [],
  startDate: {},
  carImage: {},
  loading: false,
};

export default function carReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAR:
    case SHOW_CARS_SHIPPING:
    case SHOW_CARS_SCRAP:
      return {
        ...state,
        cars: action.payload,
        loading: false,
      };
    case SEARCH_CLIENT:
      return {
        ...state,
        clients: action.payload,
        loading: false,
      };
    case SEARCH_ORDER_DATE:
      return {
        ...state,
        startDate: action.payload,
        loading: false,
      };
    case GET_CAR_IMAGE:
      return {
        ...state,
        carImage: action.payload,
        loading: false,
      };
    case ADD_CAR:
      return [action.cars, state];
    case CAR_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}

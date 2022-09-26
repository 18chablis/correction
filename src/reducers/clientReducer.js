import {
  ADD_CLIENT,
  CLIENT_LOADING,
  GET_CAR_BY_CLIENT_ID,
  GET_CLIENTS,
  GET_CLIENT_BY_NAME,
  GET_INCOMPLETE_FIELD,
  GET_NOTES,
  GET_ORDER_BY_CLIENT_ID,
  GET_RENT_STATUS,
  SHOW_CLIENT,
  UPDATE_CLIENT,
} from "../actions/client.action";

const initialState = {
  clients: [],
  client: {},
  incompleteClientsFields: [],
  searchedClient: {},
  clientOrders: [],
  rentStatus: [],
  clientCars: [],
  clientNotes: [],
  loading: false,
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        loading: false,
      };
    case GET_NOTES:
      return {
        ...state,
        clientNotes: action.payload,
        loading: false,
      };
    case GET_INCOMPLETE_FIELD:
      return {
        ...state,
        incompleteClientsFields: action.payload,
        loading: false,
      };
    case GET_RENT_STATUS:
      return {
        ...state,
        rentStatus: action.payload,
        loading: false,
      };
    case SHOW_CLIENT:
      return {
        ...state,
        client: action.payload,
        loading: false,
      };
    case GET_CLIENT_BY_NAME:
      return {
        ...state,
        searchedClient: action.payload,
        loading: false,
      };
    case GET_ORDER_BY_CLIENT_ID:
      return {
        ...state,
        clientOrders: action.payload,
        loading: false,
      };
    case GET_CAR_BY_CLIENT_ID:
      return {
        ...state,
        clientCars: action.payload,
        loading: false,
      };
    case ADD_CLIENT:
    case UPDATE_CLIENT:
      return [action.clients, state];
    case CLIENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

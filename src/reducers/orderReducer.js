import {
  CLIENT_LOADING,
  GET_ORDERS,
  ORDERS_LOADING,
  SEARCH_CLIENT,
  SEARCH_ORDER,
  SHOW_NOT_PAID_ORDER,
  SHOW_ORDER,
  SHOW_PAID_ORDER,
  SHOW_PARTIALLY_PAID_ORDER,
  SHOW_UNPAID_ORDERS,
  SHOW_ORDER_CAR_PARKING_OVERDUE,
  SHOW_ORDER_STORAGE_RENT_OVERDUE,
  SHOW_ORDER_SHIPPING_DEMURRAGE,
} from "../actions/order.action";
import {
  GET_HISTORY_BY_ORDER_ID,
  SHOW_ORDER_HISTORY,
} from "../actions/orderHistory.action";
import {
  GET_DAILY_ORDERS,
  GET_DAILY_ORDER_ON_CURRENCY,
  GET_DAILY_TOTAL_ON_CURRENCY,
  GET_MONTHLY_ORDERS,
  GET_MONTHLY_ORDER_ON_CURRENCY,
  GET_MONTHLY_TOTAL_ON_CURRENCY,
  GET_WEEKLY_ORDERS,
  GET_WEEKLY_ORDER_ON_CURRENCY,
  GET_WEEKLY_TOTAL_ON_CURRENCY,
} from "../actions/orderTotal.action";

const initialState = {
  orders: [],
  unpaidOrders: [],
  carParkingOverdue: [],
  storageRentOverdue: [],
  shippingDemurrage: [],
  clients: [],
  searchedOrder: {},
  dailyTotal: {},
  weeklyTotal: {},
  monthlyTotal: {},
  order: {},
  orderHistory: {},
  orderReceipt: {},
  reports: [],
  loading: false,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
    case GET_DAILY_ORDERS:
    case GET_WEEKLY_ORDERS:
    case GET_MONTHLY_ORDERS:
    case GET_DAILY_ORDER_ON_CURRENCY:
    case GET_WEEKLY_ORDER_ON_CURRENCY:
    case GET_MONTHLY_ORDER_ON_CURRENCY:
    case SHOW_PAID_ORDER:
    case SHOW_PARTIALLY_PAID_ORDER:
    case SHOW_NOT_PAID_ORDER:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case SHOW_UNPAID_ORDERS:
      return {
        ...state,
        unpaidOrders: action.payload,
        loading: false,
      };
    case SHOW_ORDER_CAR_PARKING_OVERDUE:
      return {
        ...state,
        carParkingOverdue: action.payload,
        loading: false,
      };
    case SHOW_ORDER_STORAGE_RENT_OVERDUE:
      return {
        ...state,
        storageRentOverdue: action.payload,
        loading: false,
      };
    case SHOW_ORDER_SHIPPING_DEMURRAGE:
      return {
        ...state,
        shippingDemurrage: action.payload,
        loading: false,
      };
    case SEARCH_ORDER:
      return {
        ...state,
        searchedOrder: action.payload,
        loading: false,
      };
    case GET_DAILY_TOTAL_ON_CURRENCY:
      return {
        ...state,
        dailyTotalOnCurrency: action.payload,
        loading: false,
      };
    case GET_WEEKLY_TOTAL_ON_CURRENCY:
      return {
        ...state,
        weeklyTotalOnCurrency: action.payload,
        loading: false,
      };
    case GET_MONTHLY_TOTAL_ON_CURRENCY:
      return {
        ...state,
        monthlyTotalOnCurrency: action.payload,
        loading: false,
      };
    case SEARCH_CLIENT:
      return {
        ...state,
        clients: action.payload,
        loading: false,
      };
    case SHOW_ORDER:
      return {
        ...state,
        order: action.payload,
        loading: false,
      };
    case GET_HISTORY_BY_ORDER_ID:
      return {
        ...state,
        orderHistory: action.payload,
        loading: false,
      };
    case SHOW_ORDER_HISTORY:
      return {
        ...state,
        orderReceipt: action.payload,
        loading: false,
      };
    case ORDERS_LOADING:
    case CLIENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

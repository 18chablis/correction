import axios from "axios";
import { SET_MESSAGE } from "./error.action";

export const GET_ORDERS = "GET_ORDERS";
export const SEARCH_CLIENT = "SEARCH_CLIENT";
export const SEARCH_ORDER = "SEARCH_ORDER";
export const SHOW_ORDER = "SHOW_ORDER";
export const SHOW_PAID_ORDER = "SHOW_PAID_ORDER";
export const SHOW_PARTIALLY_PAID_ORDER = "SHOW_PARTIALLY_PAID_ORDER";
export const SHOW_NOT_PAID_ORDER = "SHOW_NOT_PAID_ORDER";
export const SHOW_UNPAID_ORDERS = "SHOW_UNPAID_ORDERS";
export const SHOW_ORDER_CAR_PARKING_OVERDUE = "SHOW_ORDER_CAR_PARKING_OVERDUE";
export const SHOW_ORDER_STORAGE_RENT_OVERDUE = "SHOW_ORDER_STORAGE_RENT_OVERDUE";
export const SHOW_ORDER_SHIPPING_DEMURRAGE = "SHOW_ORDER_SHIPPING_DEMURRAGE";
export const DELETE_ORDER = "DELETE_ORDER";
export const ORDERS_LOADING = "ORDERS_LOADING";
export const CLIENT_LOADING = "CLIENT_LOADING";

export const getOrders = (num) => {
  return async function (dispatch) {
    dispatch(ordersLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders?page=${num}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_ORDERS, payload: res.data });
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};

export const searchClientName = (key) => {
  return async function (dispatch) {
    dispatch(clientLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/search/client/${key}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: SEARCH_CLIENT, payload: res.data });
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};
export const searchOrder = (key) => {
  return async function (dispatch) {
    dispatch(ordersLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/search/${key}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: SEARCH_ORDER, payload: res.data });
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};

export const showOrderToEdit = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/orders/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: id,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SHOW_ORDER, payload: res.data });
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};

export const getPaidOrder = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/orders/filter/paid`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SHOW_PAID_ORDER, payload: res.data });
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};
export const getPartiallyPaidOrder = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/orders/filter/partially_paid`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SHOW_PARTIALLY_PAID_ORDER, payload: res.data });
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};
export const getNotPaidOrder = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/orders/filter/not_paid`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SHOW_NOT_PAID_ORDER, payload: res.data });
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};
export const getUnPaidOrder = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/orders/unpaid`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SHOW_UNPAID_ORDERS, payload: res.data });
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};
export const getCarParkingOverdue = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/orders/car_parking/overdue`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SHOW_ORDER_CAR_PARKING_OVERDUE, payload: res.data });
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};
export const getStorageRentOverdue = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/orders/storage_rent/overdue`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: SHOW_ORDER_STORAGE_RENT_OVERDUE,
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};
export const getOrderShippingDemurrage = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/orders/shipping/demurrage`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: SHOW_ORDER_SHIPPING_DEMURRAGE,
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};

export const deleteOrder = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/orders/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        dispatch({ type: DELETE_ORDER, payload: id });
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
};

export const ordersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};
export const clientLoading = () => {
  return {
    type: CLIENT_LOADING,
  };
};

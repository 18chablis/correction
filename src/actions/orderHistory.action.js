import axios from "axios";
import { SET_MESSAGE } from "./error.action";

export const GET_HISTORY_BY_ORDER_ID = "GET_HISTORY_BY_ORDER_ID";
export const SHOW_ORDER_HISTORY = "SHOW_ORDER_HISTORY";
export const DELETE_ORDER_HISTORY = "DELETE_ORDER_HISTORY";

export const getOrderHistory = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/orders/history/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: id,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: GET_HISTORY_BY_ORDER_ID, payload: res.data });
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
export const showHistoryToPrint = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/orders/receipt/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: id,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SHOW_ORDER_HISTORY, payload: res.data });
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

export const deleteOrderHistory = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/orders/history/delete/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        dispatch({ type: DELETE_ORDER_HISTORY, payload: id });
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

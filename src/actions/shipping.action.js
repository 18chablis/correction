import axios from "axios";
import { SET_MESSAGE } from "./error.action";
export const ADD_ORDER_SHIPPING = "ADD_ORDER_SHIPPING";
export const UPDATE_ORDER_SHIPPING = "UPDATE_ORDER_SHIPPING";

export const addOrderShipping = (shippingOrder) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/orders/shipping`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: shippingOrder,
    })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("message-response", res.data.message);
          const message = res.data.message;
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({ type: ADD_ORDER_SHIPPING, payload: shippingOrder });
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

export const updateOrderShipping = (orderNewData, id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/orders/shipping/update=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: orderNewData,
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({
            type: UPDATE_ORDER_SHIPPING,
            payload: orderNewData,
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

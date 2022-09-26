import axios from "axios";
import { SET_MESSAGE } from "./error.action";
export const ADD_ORDER_RAMP = "ADD_ORDER_RAMP";
export const UPDATE_ORDER_RAMP = "UPDATE_ORDER_RAMP";

export const addOrderRamp = (rampOrder) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/orders/ramp`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: rampOrder,
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          localStorage.setItem("message-response", message);
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({ type: ADD_ORDER_RAMP, payload: rampOrder });
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
export const updateOrderRamp = (orderNewData, id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/orders/ramp/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: { ...orderNewData },
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({
            type: UPDATE_ORDER_RAMP,
            payload: { ...orderNewData },
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

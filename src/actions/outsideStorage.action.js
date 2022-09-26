import axios from "axios";
import { SET_MESSAGE } from "./error.action";
export const ADD_ORDER_OUTSIDE_STORAGE = "ADD_ORDER_OUTSIDE_STORAGE";
export const UPDATE_ORDER_OUTSIDE_STORAGE = "UPDATE_OUTSIDE_STORAGE";

export const addOrderOutsideStorage = (outsideStorageOrder) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/orders/outside_storage`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: outsideStorageOrder,
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          localStorage.setItem("message-response", message);

          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({
            type: ADD_ORDER_OUTSIDE_STORAGE,
            payload: outsideStorageOrder,
            // payload: res.data,
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
export const updateOrderOutsideStorage = (orderNewData, id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/orders/outside_storage/${id}`,
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
            type: UPDATE_ORDER_OUTSIDE_STORAGE,
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

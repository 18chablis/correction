import axios from "axios";
import { SET_MESSAGE } from "./error.action";

export const ADD_ORDER_STORAGE_RENT = "ADD_ORDER_STORAGE_RENT";
export const UPDATE_ORDER_STORAGE_RENT = "UPDATE_ORDER_STORAGE_RENT";

export const addOrderStorageRent = (storageRentOrder) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/orders/storage_rent`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: storageRentOrder,
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          localStorage.setItem("message-response", message);

          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({ type: ADD_ORDER_STORAGE_RENT, payload: storageRentOrder });
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

export const updateOrderStorageRent = (orderNewData, id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/orders/storage_rent/${id}`,
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
            type: UPDATE_ORDER_STORAGE_RENT,
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

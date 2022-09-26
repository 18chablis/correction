import axios from "axios";
import { SET_MESSAGE } from "./error.action";

export const UPDATE_ORDER_CAR_SCRAP = "UPDATE_ORDER_CAR_SCRAP";
export const ADD_ORDER_CAR_SCRAP = "ADD_ORDER_CAR_SCRAP";

export const updateOrderCarScrap = (orderNewData, id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/orders/car_scrap/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: { ...orderNewData },
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
            type: UPDATE_ORDER_CAR_SCRAP,
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

export const addOrderCarScrap = (carScrapOrder) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/orders/car_scrap`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: carScrapOrder,
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({ type: ADD_ORDER_CAR_SCRAP, payload: carScrapOrder });
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

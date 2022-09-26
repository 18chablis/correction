import axios from "axios";
import { SET_MESSAGE } from "./error.action";

export const GET_CAR = "GET_CAR";
export const GET_CAR_IMAGE = "GET_CAR_IMAGE";
export const SHOW_CARS_SHIPPING = "SHOW_CARS_SHIPPING";
export const SHOW_CARS_SCRAP = "SHOW_CARS_SCRAP";
export const DELETE_CAR = "DELETE_CAR";
export const ADD_CAR = "ADD_CAR";
export const ADD_CAR_FAIL = "ADD_CAR_FAIL";
export const CAR_LOADING = "CAR_LOADING";
export const CLIENT_LOADING = "CLIENT_LOADING";
export const SEARCH_CLIENT = "SEARCH_CLIENT";
export const SEARCH_ORDER_DATE = "SEARCH_ORDER_DATE";

export const getCars = (num) => {
  return async function (dispatch) {
    dispatch(carsLoading());
    const token = await localStorage.getItem("user-token");
    // console.log(token);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/cars?page=${num}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_CAR, payload: res.data });
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
export const getCarImage = (id) => {
  return async function (dispatch) {
    dispatch(carsLoading());
    const token = await localStorage.getItem("user-token");
    // console.log(token);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/cars/images/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_CAR_IMAGE, payload: res.data });
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
export const addCar = (car) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/cars`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: car,
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({ type: ADD_CAR, payload: car });
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
export const searchClientName = (key) => {
  return async function (dispatch) {
    dispatch(clientLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/cars/clients/search/${key}`, {
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
export const searchOrderStartDate = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/cars/orders/search/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: SEARCH_ORDER_DATE, payload: res.data });
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

export const deleteCar = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/cars/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        dispatch({ type: DELETE_CAR, payload: id });
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

export const getStatusShipping = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/cars/filter/shipping`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SHOW_CARS_SHIPPING, payload: res.data });
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
export const getStatusScrap = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/cars/filter/scrap`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SHOW_CARS_SCRAP, payload: res.data });
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

export const carsLoading = () => {
  return {
    type: CAR_LOADING,
  };
};
export const clientLoading = () => {
  return {
    type: CLIENT_LOADING,
  };
};

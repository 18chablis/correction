import axios from "axios";
import { SET_MESSAGE } from "./error.action";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const AUTH_USER = "AUTH_USER";

export const register = (credentials) => {
  return async function (dispatch) {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/users/register`,
      headers: {
        Accept: "application/json",
      },
      data: credentials,
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({ type: REGISTER_SUCCESS, payload: credentials });
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
export const loginAction = (credentials, history) => {
  return async function (dispatch) {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/users/login`,
      headers: {
        Accept: "application/json",
      },
      data: credentials,
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user-token", res.data.token);
          const message = res.data.message;
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({ type: LOGIN_SUCCESS, payload: credentials });
          history.push("/dashboard");
        } else if (res.success === false) {
          dispatch({ type: LOGIN_ERROR, res });
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

export const getUser = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/view-profile`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: AUTH_USER, payload: res.data });
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

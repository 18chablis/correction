import axios from "axios";
import { SET_MESSAGE } from "./error.action";

export const GET_USER = "GET_USER";
export const GET_USERS = "GET_USERS";
export const DELETE_USER = "DELETE_USER";

export const getUsers = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/list`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
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
        dispatch({ type: GET_USER, payload: res.data });
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

export const deleteUser = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: id });
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

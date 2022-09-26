import axios from "axios";
import { SET_MESSAGE } from "./error.action";

export const GET_NOTES = "GET_NOTES";
export const NOTE_LOADING = "NOTE_LOADING";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

export const getNotes = (id) => {
  return async function (dispatch) {
    dispatch(notesLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/notes/list/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_NOTES, payload: res.data });
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

export const addNote = (orderNote) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/orders/notes`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: orderNote,
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({ type: ADD_NOTE, payload: orderNote });
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

export const deleteNote = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/orders/notes/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        dispatch({ type: DELETE_NOTE, payload: id });
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

export const notesLoading = () => {
  return {
    type: NOTE_LOADING,
  };
};

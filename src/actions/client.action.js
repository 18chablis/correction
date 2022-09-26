import axios from "axios";
import { SET_MESSAGE } from "./error.action";

export const GET_CLIENTS = "GET_CLIENTS";
export const GET_NOTES = "GET_NOTES";
export const GET_INCOMPLETE_FIELD = "GET_INCOMPLETE_FIELD";
export const GET_ORDER_BY_CLIENT_ID = "GET_ORDER_BY_CLIENT_ID";
export const GET_CAR_BY_CLIENT_ID = "GET_CAR_BY_CLIENT_ID";
export const GET_CLIENT_BY_NAME = "GET_CLIENT_BY_NAME";
export const GET_CLIENT_BY_NAME_FAIL = "GET_CLIENT_BY_NAME_FAIL";
export const GET_CLIENTS_ERRORS = "GET_CLIENTS_ERRORS";
export const ADD_CLIENT = "ADD_CLIENT";
export const ADD_CLIENT_FAIL = "ADD_CLIENT_FAIL";
export const CLIENT_LOADING = "CLIENT_LOADING";
export const CLIENT_LOADING_ERRORS = "CLIENT_LOADING_ERRORS";
export const SHOW_CLIENT = "SHOW_CLIENT";
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const DELETE_NOTE = "DELETE_NOTE";
export const GET_RENT_STATUS = "GET_RENT_STATUS";

export const getClients = (num) => {
  return async function (dispatch) {
    dispatch(clientsLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/clients?page=${num}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_CLIENTS, payload: res.data });
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

export const getNotes = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/clients/notes/${id}`, {
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
export const deleteNote = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/clients/notes/${id}`,
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
export const getRentStatus = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/orders/storage_rent/status/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
          data: id,
        }
      )
      .then((res) => {
        dispatch({ type: GET_RENT_STATUS, payload: res.data });
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

export const addClient = (client) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/clients`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: client,
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({ type: ADD_CLIENT, payload: client });
        }
        //
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
export const updateClient = (clientData, id, history) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/clients/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: { ...clientData },
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({ type: UPDATE_CLIENT, payload: { ...clientData } });
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
export const getClientByName = (key) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/clients/search/${key}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: GET_CLIENT_BY_NAME, payload: res.data });
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
export const getIncompleteField = () => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/clients/field/incomplete`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: GET_INCOMPLETE_FIELD, payload: res.data });
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

export const showClientToEdit = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/clients/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: id,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: SHOW_CLIENT, payload: res.data });
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
export const getOrderByClientId = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/clients/orders/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: id,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: GET_ORDER_BY_CLIENT_ID, payload: res.data });
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
export const getCarByClientId = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/clients/cars/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: id,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: GET_CAR_BY_CLIENT_ID, payload: res.data });
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

export const deleteClient = (id) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/clients/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        dispatch({ type: DELETE_CLIENT, payload: id });
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

export const clientsLoading = () => {
  return {
    type: CLIENT_LOADING,
  };
};

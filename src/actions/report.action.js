import axios from "axios";
import { SET_MESSAGE } from "./error.action";

export const SEND_REPORT = "SEND_REPORT";

export const sendReport = (reportData) => {
  return async function (dispatch) {
    const token = await localStorage.getItem("user-token");
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/report`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: reportData,
    })
      .then((res) => {
        if (res.data.success) {
          const message = res.data.message;
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          dispatch({ type: SEND_REPORT, payload: reportData });
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

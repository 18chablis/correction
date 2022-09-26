import axios from "axios";
import { SET_MESSAGE } from "./error.action";
import { ordersLoading } from "./order.action";

export const GET_DAILY_TOTAL = "GET_DAILY_TOTAL";
export const GET_DAILY_ORDER_ON_CURRENCY = "GET_DAILY_ORDER_ON_CURRENCY";
export const GET_WEEKLY_ORDER_ON_CURRENCY = "GET_WEEKLY_ORDER_ON_CURRENCY";
export const GET_MONTHLY_ORDER_ON_CURRENCY = "GET_MONTHLY_ORDER_ON_CURRENCY";
export const GET_DAILY_TOTAL_ON_CURRENCY = "GET_DAILY_TOTAL_ON_CURRENCY";
export const GET_WEEKLY_TOTAL_ON_CURRENCY = "GET_WEEKLY_TOTAL_ON_CURRENCY";
export const GET_MONTHLY_TOTAL_ON_CURRENCY = "GET_MONTHLY_TOTAL_ON_CURRENCY";
export const GET_MONTHLY_TOTAL = "GET_MONTHLY_TOTAL";
export const GET_DAILY_ORDERS = "GET_DAILY_ORDERS";
export const GET_WEEKLY_ORDERS = "GET_WEEKLY_ORDERS";
export const GET_MONTHLY_ORDERS = "GET_MONTHLY_ORDERS";

// export const getDailyOrders = (key, num) => {
//   return async function (dispatch) {
//     dispatch(ordersLoading());
//     const token = await localStorage.getItem("user-token");
//     await axios
//       .get(
//         `${process.env.REACT_APP_API_URL}/api/orders/daily/${key}?page=${num}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       )
//       .then((res) => {
//         dispatch({ type: GET_DAILY_ORDERS, payload: res.data });
//       })
//       .catch((error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });
//       });
//   };
// };
// export const getWeeklyOrders = (key, num) => {
//   return async function (dispatch) {
//     dispatch(ordersLoading());
//     const token = await localStorage.getItem("user-token");
//     await axios
//       .get(
//         `${process.env.REACT_APP_API_URL}/api/orders/weekly/${key}?page=${num}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       )
//       .then((res) => {
//         dispatch({ type: GET_WEEKLY_ORDERS, payload: res.data });
//       })
//       .catch((error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });
//       });
//   };
// };
// export const getMonthlyOrders = (key, num) => {
//   return async function (dispatch) {
//     dispatch(ordersLoading());
//     const token = await localStorage.getItem("user-token");
//     await axios
//       .get(
//         `${process.env.REACT_APP_API_URL}/api/orders/monthly/${key}?page=${num}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       )
//       .then((res) => {
//         dispatch({ type: GET_MONTHLY_ORDERS, payload: res.data });
//       })
//       .catch((error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });
//       });
//   };
// };
export const getDailyTotalOnCurrency = (currency, paid) => {
  return async function (dispatch) {
    dispatch(ordersLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/orders/sum/daily/${currency}/${paid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_DAILY_TOTAL_ON_CURRENCY, payload: res.data });
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
export const getWeeklyTotalOnCurrency = (currency, paid) => {
  return async function (dispatch) {
    dispatch(ordersLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/orders/sum/weekly/${currency}/${paid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_WEEKLY_TOTAL_ON_CURRENCY, payload: res.data });
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
export const getMonthlyTotalOnCurrency = (currency, paid) => {
  return async function (dispatch) {
    dispatch(ordersLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/orders/sum/monthly/${currency}/${paid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_MONTHLY_TOTAL_ON_CURRENCY, payload: res.data });
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
export const getDailyOrderOnCurrency = (currency, paid, num) => {
  return async function (dispatch) {
    dispatch(ordersLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/orders/filter/daily/${currency}/${paid}?page=${num}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_DAILY_ORDER_ON_CURRENCY, payload: res.data });
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
export const getWeeklyOrderOnCurrency = (currency, paid, num) => {
  return async function (dispatch) {
    dispatch(ordersLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/orders/filter/daily/${currency}/${paid}?page=${num}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_WEEKLY_ORDER_ON_CURRENCY, payload: res.data });
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
export const getMonthlyOrderOnCurrency = (currency, paid, num) => {
  return async function (dispatch) {
    dispatch(ordersLoading());
    const token = await localStorage.getItem("user-token");
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/orders/filter/daily/${currency}/${paid}?page=${num}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_MONTHLY_ORDER_ON_CURRENCY, payload: res.data });
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

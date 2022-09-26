import { lazy } from "react";
const Welcome = lazy(() => import("../pages/Welcome"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
// const Register = lazy(() => import("../pages/Register"));
const Order = lazy(() => import("../pages/Order"));
const OrderDetails = lazy(() => import("../pages/OrderDetails"));
const OrderReceipt = lazy(() => import("../pages/OrderReceipt"));
const OrderHistory = lazy(() => import("../pages/OrderHistory"));
const Report = lazy(() => import("../pages/Report"));
const Client = lazy(() => import("../pages/Client"));
const ClientEdit = lazy(() => import("../pages/ClientEdit"));
const ClientProfile = lazy(() => import("../pages/ClientProfile"));
const Car = lazy(() => import("../pages/Car"));
const User = lazy(() => import("../pages/User"));
const CarImageView = lazy(() => import("../pages/CarImageView"));

const routes = [
  {
    path: "/",
    exact: true,
    auth: true,
    component: Welcome,
    fallback: Welcome,
  },
  {
    path: "/dashboard",
    exact: true,
    auth: true,
    component: Dashboard,
    fallback: Dashboard,
  },
  {
    path: "/report",
    exact: true,
    auth: true,
    component: Report,
    fallback: Report,
  },
  {
    path: "/order",
    exact: true,
    auth: true,
    component: Order,
    fallback: Order,
  },
  {
    path: "/order/update/:id",
    exact: true,
    auth: true,
    component: OrderDetails,
    fallback: OrderDetails,
  },
  {
    path: "/order/history/:id",
    exact: true,
    auth: true,
    component: OrderHistory,
    fallback: OrderHistory,
  },
  {
    path: "/order/receipt/:id",
    exact: true,
    auth: true,
    component: OrderReceipt,
    fallback: OrderReceipt,
  },
  {
    path: "/client",
    exact: true,
    auth: true,
    component: Client,
    fallback: Client,
  },
  {
    path: "/client/view-profile/:id",
    exact: true,
    auth: true,
    component: ClientProfile,
    fallback: ClientProfile,
  },
  {
    path: "/client/update/:id",
    exact: true,
    auth: true,
    component: ClientEdit,
    fallback: ClientEdit,
  },
  {
    path: "/car",
    exact: true,
    auth: true,
    component: Car,
    fallback: Car,
  },
  {
    path: "/car/images/:id",
    exact: true,
    auth: true,
    component: CarImageView,
    fallback: CarImageView,
  },
  {
    path: "/user",
    exact: true,
    auth: true,
    component: User,
    fallback: User,
  },
  {
    path: "/login",
    exact: true,
    auth: false,
    component: Login,
  },
  // {
  //   path: "/register",
  //   exact: true,
  //   auth: false,
  //   component: Register,
  // },
];

export default routes;

import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { SideBarData } from "./SidebarData";
import "../styles/sidebar.css";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions/auth.action";
import { clearMessage } from "../actions/error.action";
import { getIncompleteField } from "../actions/client.action";
import { isEmpty } from "../utils/Utils";
import {
  getCarParkingOverdue,
  getOrderShippingDemurrage,
  getStorageRentOverdue,
  getUnPaidOrder,
} from "../actions/order.action";

const Bars = styled(FaBars)`
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: middle;
  display: block;
`;
const LogOut = styled(FiLogOut)`
  border-radius: 9999px;
  max-width: 100%;
  display: block;
  vertical-align: middle;
  height: 2rem;
  object-fit: cover;
  width: 2rem;
`;
const BellIcon = styled(BsBell)`
  border-radius: 9999px;
  max-width: 100%;
  display: block;
  vertical-align: middle;
  height: 2rem;
  object-fit: cover;
  width: 2rem;
`;
function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const { incompleteClientsFields } = useSelector(
    (state) => state.clientReducer
  );
  const {
    unpaidOrders,
    carParkingOverdue,
    storageRentOverdue,
    shippingDemurrage,
  } = useSelector((state) => state.orderReducer);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch();
  const history = useHistory();
  const logOut = () => {
    history.push("/login");
    localStorage.clear();
  };
  useEffect(() => {
    dispatch(getUser());
    dispatch(getIncompleteField());
    dispatch(getUnPaidOrder());
    dispatch(getCarParkingOverdue());
    dispatch(getStorageRentOverdue());
    dispatch(getOrderShippingDemurrage());
    setTimeout(function () {
      dispatch(clearMessage());
    }, 5000);
  }, [dispatch]);
  const token = localStorage.getItem("user-token");
  const handleNotificationView = (ref) => {
    setDisplayDropdown(!displayDropdown);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="navbar-content">
            <Link to="#" className="menu-bars">
              <Bars onClick={showSidebar} />
            </Link>
            <img
              src={`${process.env.PUBLIC_URL}/hermann-logo-with-no-background.png`}
              alt="logo"
              className="logo"
            />
            <ul className="nav-left-ul">
              {token !== null && token !== "" ? (
                <>
                  <li className="nav-left-li">
                    <button
                      onClick={handleNotificationView}
                      className="nav-left-btn"
                    >
                      <BellIcon />
                      <div
                        style={{
                          display:
                            !isEmpty(incompleteClientsFields) ||
                            !isEmpty(unpaidOrders) ||
                            !isEmpty(storageRentOverdue) ||
                            !isEmpty(shippingDemurrage) ||
                            !isEmpty(carParkingOverdue)
                              ? "block"
                              : "none",
                        }}
                        className="red_circle"
                      >
                        {!isEmpty(incompleteClientsFields) &&
                          !isEmpty(unpaidOrders) &&
                          !isEmpty(storageRentOverdue) &&
                          !isEmpty(shippingDemurrage) &&
                          !isEmpty(carParkingOverdue) &&
                          incompleteClientsFields.length +
                            unpaidOrders.length +
                            storageRentOverdue.length +
                            carParkingOverdue.length}
                      </div>
                    </button>

                    <div className={displayDropdown ? "dropdown" : "drop"}>
                      <ul
                        style={{
                          display: displayDropdown ? "block" : "none",
                          backgroundColor: "#4D6FAD",
                          padding: "10px",
                          borderRadius: "8px",
                        }}
                        className={displayDropdown ? "dropdown-list" : "drop"}
                      >
                        <p style={{ color: "#fff" }}>Clients</p>
                        <hr />
                        {!isEmpty(incompleteClientsFields) &&
                          incompleteClientsFields.map((client, index) => (
                            <Link
                              key={index}
                              to={`/client/update/${client.id}`}
                            >
                              <li style={{ margin: "10px 0" }}>
                                Client {client.full_name.toUpperCase()} has some
                                incomplete field
                              </li>
                            </Link>
                          ))}

                        <hr />
                        <p style={{ color: "#fff" }}>Orders</p>
                        {!isEmpty(unpaidOrders) &&
                          unpaidOrders.map((order, index) => (
                            <Link key={index} to={`/order/update/${order.id}`}>
                              <li style={{ margin: "10px 0" }}>
                                Client {order.client.full_name.toUpperCase()}{" "}
                                Order {order.order_type} payment is incomplete
                              </li>
                            </Link>
                          ))}
                        <hr />
                        <p style={{ color: "#fff" }}>Orders Car Parking</p>
                        {!isEmpty(carParkingOverdue) &&
                          carParkingOverdue.map((order, index) => (
                            <Link key={index} to={`/order/update/${order.id}`}>
                              <li style={{ margin: "10px 0" }}>
                                Client {order.full_name.toUpperCase()} Order{" "}
                                {order.order_type} end of free charge have
                                passed. 7 dollars automatically added to the
                                overdue
                              </li>
                            </Link>
                          ))}
                        <hr />
                        <p style={{ color: "#fff" }}>Orders Storage rent</p>
                        {!isEmpty(storageRentOverdue) &&
                          storageRentOverdue.map((order, index) => (
                            <Link key={index} to={`/order/update/${order.id}`}>
                              <li style={{ margin: "10px 0" }}>
                                Client {order.full_name.toUpperCase()} Order{" "}
                                {order.order_type} end of free charge have
                                passed. Order will be automatically added
                              </li>
                            </Link>
                          ))}
                        <hr />
                        <p style={{ color: "#fff" }}>Orders Shipping</p>
                        {!isEmpty(shippingDemurrage) &&
                          shippingDemurrage.map((order, index) => (
                            <Link key={index} to={`/order/update/${order.id}`}>
                              <li style={{ margin: "10px 0" }}>
                                Client {order.full_name.toUpperCase()} Order{" "}
                                {order.order_type} is Demurrage
                              </li>
                            </Link>
                          ))}
                      </ul>
                      <button
                        style={{
                          display: displayDropdown ? "block" : "none",
                          right: "10px",
                          marginTop: "20px",
                          padding: "6px 14px",
                          color: "#fff",
                          background: "#1244a0",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={handleNotificationView}
                      >
                        Done
                      </button>
                    </div>
                  </li>
                  <li className="nav-left-li">
                    <button className="nav-left-btn">
                      <LogOut onClick={logOut} />
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-left-li">
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        {token !== null && token !== "" && (
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiOutlineClose />
                </Link>
              </li>
              <SideBarData />
            </ul>
          </nav>
        )}
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;

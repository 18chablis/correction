import React, { useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import {
  IoIosPerson,
  IoIosPeople,
  IoIosSettings,
  IoMdCar,
} from "react-icons/io";
import { HiDocumentReport } from "react-icons/hi";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions/user.action";
export const SideBarData = () => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      <li className="nav-text">
        <Link to="/dashboard">
          <AiFillHome />
          <span>Dashboard</span>
        </Link>
      </li>
      <li className="nav-text">
        <Link to="/client">
          <IoIosPeople />
          <span>Clients</span>
        </Link>
      </li>
      <li className="nav-text">
        <Link to="/order">
          <FaCartPlus />
          <span>Orders</span>
        </Link>
      </li>
      <li className="nav-text">
        <Link to="/car">
          <IoMdCar />
          <span>Cars</span>
        </Link>
      </li>
      <li className="nav-text">
        <Link to="/report">
          <HiDocumentReport />
          <span>Reports</span>
        </Link>
      </li>
      {user.user.role === "admin" && (
        <li className="nav-text">
          <Link to="/user">
            <IoIosPerson />
            <span>User</span>
          </Link>
        </li>
      )}
      <li className="nav-text">
        <Link to="/settings">
          <IoIosSettings />
          <span>Settings</span>
        </Link>
      </li>
    </>
  );
};

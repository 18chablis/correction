import React from "react";
import Sidebar from "./components/Sidebar";

const Base = ({ children }) => (
  <div>
    <Sidebar />
    <main>{children}</main>
  </div>
);

export default Base;

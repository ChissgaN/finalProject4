import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";

const LayoutAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="grid min-h-screen grid-cols-1 xl:grid-cols-6">
      <Sidebar />
      <div className="xl:col-span-5">
        <Navbar />
        <div className="h-[90vh] overflow-y-scroll px-8 pt-[12px] bg-[#F4F4F5]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;

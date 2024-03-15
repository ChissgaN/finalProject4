import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className=" w-[100%] bg-[#CBEEF3]  text-gray-400   items-center h-[100px]  rounded-[10px] px-8 my-12 ">
        <h2 className="pt-[1%] text-black text-xl font-semibold mb-4">
          Welcome!
        </h2>
        <p className="text-black">
          Select the action you want to take on the left line
        </p>
      </div>
    </>
  );
}

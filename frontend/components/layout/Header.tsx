"use client";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  return (
    <header className="bg-[#2F4698] shadow-lg border-b border-[#2F4698] mx-4 sm:mx-6 lg:mx-6 my-4 rounded-lg">
      <div className="p-4 sm:px-6 flex items-center justify-between">
        <h1 className=" font-semibold text-white">Admin Panel</h1>
        <p className="flex items-center space-x-3 sm:space-x-6 text-white">
          {user?.name} {user?.surname}
        </p>
      </div>
    </header>
  );
};

export default Header;

"use client";
import React from "react";
import { GlobeAltIcon } from "@heroicons/react/20/solid";
import ActiveLinkToggler from "./ActiveLinkToggler";
import SearchBar from "./SearchBar";
import ThemeToggler from "./ThemeToggler";
import { useAppSelector } from "@/redux/store";

const Navbar = () => {
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={` flex justify-center w-full p-4 -mb-14 pt-10 ${
        isDarkMode ? "bg-custom-dark2" : "bg-gray-300"
      }`}
    >
      <div className="flex justify-center items-center h-full md:w-full xl:w-1/2">
        <div className="flex justify-evenly items-center w-1/2">
          <div className="text-white flex items-center">
            <GlobeAltIcon className="w-8 h-8 text-white mr-1" />
            <h1 className="text-3xl">CoinTrader</h1>
          </div>
          <h2 className="text-white text-xl">|</h2>
          <ActiveLinkToggler />
        </div>
        <div className="flex items-center justify-around w-1/2">
          <SearchBar />
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

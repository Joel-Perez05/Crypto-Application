"use client";
import React from "react";
import { GlobeAltIcon } from "@heroicons/react/20/solid";
import ActiveLinkToggler from "./ActiveLinkToggler";
import SearchBar from "./SearchBar";
import ThemeToggler from "./ThemeToggler";
import { useAppSelector } from "@/redux/store";
import CurrencySelector from "./CurrencySelector";

const Navbar = () => {
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={` flex justify-center max-sm:items-center xs:w-full max-sm:pt-4 max-sm:pb-4 w-full md:p-4 -mb-14 md:pt-10 ${
        isDarkMode ? "bg-custom-dark2" : "bg-gray-300"
      }`}
    >
      <div className="flex justify-center max-xs:flex-col max-xs:items-start items-center h-full md:w-full xl:w-1/2">
        <div className="flex md:justify-evenly max-xs:w-full max-xs:justify-between items-center md:w-1/2">
          <div
            className={`${
              isDarkMode ? "text-white" : "text-black"
            } flex items-center`}
          >
            <GlobeAltIcon className="w-8 h-8 mr-1" />
            <h1 className="text-3xl max-sm:mr-2">CoinTrader</h1>
          </div>
          <h2
            className={`${
              isDarkMode ? "text-white" : "text-black"
            }max-sm:mr-2 text-xl`}
          >
            |
          </h2>
          <ActiveLinkToggler />
        </div>
        <div className="flex max-sm:mt-2 items-center max-sm:justify-between md:justify-evenly max-sm:w-full md:w-1/2">
          <SearchBar />
          <CurrencySelector />
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

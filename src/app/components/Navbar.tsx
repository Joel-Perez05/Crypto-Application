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
      <div className="flex max-xs:flex-col max-xs:items-start items-center h-full md:w-full xl:w-4/5">
        <div className="xl:pl-12 md:pl-2 flex md:justify-evenly xl:justify-start max-xs:w-full max-xs:justify-between items-center w-1/2">
          <div
            className={`${
              isDarkMode ? "text-white" : "text-black"
            } flex items-center`}
          >
            <GlobeAltIcon className="w-8 h-8 mr-2" />
            <h1 className="text-3xl xl:mr-16 max-sm:mr-2">CoinTrader</h1>
          </div>
          <h2
            className={`${
              isDarkMode ? "text-white" : "text-black"
            }max-sm:mr-2 text-xl xl:mr-16`}
          >
            |
          </h2>
          <ActiveLinkToggler />
        </div>
        <div className="xl:pr-12 md:pr-2 flex max-sm:mt-2 xl:justify-end items-center max-sm:justify-between md:justify-evenly max-sm:w-full w-1/2">
          <SearchBar />
          <CurrencySelector />
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

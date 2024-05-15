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
    <div className="w-full h-48 flex justify-center mt-8">
      <div className={`w-1296 ${isDarkMode ? "bg-[#13121A]" : "bg-gray-300"}`}>
        <div className="flex justify-between">
          <div className=" flex md:justify-evenly xl:justify-start max-xs:justify-between items-center w-483">
            <div
              className={`${
                isDarkMode ? "text-white" : "text-black"
              } flex items-center w-170`}
            >
              <GlobeAltIcon className="w-7 h-7 mr-2 text-[#6161D6]" />
              <h1 className="text-xl">CoinTrader</h1>
            </div>
            <div
              className={`${
                isDarkMode ? "text-white" : "text-black"
              } text-opacity-50 w-4`}
            >
              |
            </div>
            <ActiveLinkToggler />
          </div>
          <div className="flex justify-between items-center w-544">
            <SearchBar />
            <CurrencySelector />
            <ThemeToggler />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

"use client";
import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { toggleTheme } from "@/redux/features/theme-Slice";

const ThemeToggler = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  const handleThemeToggler = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center justify-center border-2 rounded-md border-[#212140] h-48 w-48">
      <button
        className={`${
          isDarkMode ? "bg-[#191925]" : "bg-white"
        } h-full w-full flex justify-center items-center rounded-md`}
        onClick={handleThemeToggler}
      >
        {isDarkMode ? (
          <SunIcon className="w-6 h-6 text-white" />
        ) : (
          <MoonIcon className="w-6 h-6 text-black" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggler;

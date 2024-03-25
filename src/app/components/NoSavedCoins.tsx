"use client";
import React from "react";
import { useAppSelector } from "@/redux/store";

const NoSavedCoins = () => {
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div className="mt-10 mb-10">
      <div
        className={`${
          isDarkMode ? "text-white" : "text-black"
        } flex justify-center text-3xl`}
      >
        No Saved Assets At This Time.
      </div>
    </div>
  );
};

export default NoSavedCoins;

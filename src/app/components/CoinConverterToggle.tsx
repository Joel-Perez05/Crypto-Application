import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleConvertor } from "@/redux/features/convertorToggler-Slice";

const CoinConverterToggle: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleConvertorToggler = (toggle: string) => {
    dispatch(toggleConvertor(toggle));
  };

  const selectedToggle = useAppSelector((state) => state.toggler.toggler);

  return (
    <div className="w-506 h-53 flex justify-center items-center text-white dark:bg-[#191925] bg-white rounded-lg">
      <div
        className={`w-244 h-45 rounded-md   ${
          selectedToggle === "coins"
            ? "bg-[#6161d686]"
            : "dark:bg-[#232336] bg-white dark:text-white text-[#424286]"
        }`}
      >
        <button
          onClick={() => handleConvertorToggler("coins")}
          className="text-center w-full h-full"
        >
          Coins
        </button>
      </div>
      <div
        className={`w-244 h-45 rounded-md   ${
          selectedToggle === "convertor"
            ? "bg-[#6161d686]"
            : "dark:bg-[#232336] bg-white dark:text-white text-[#424286]"
        }`}
      >
        <button
          onClick={() => handleConvertorToggler("convertor")}
          className="text-center w-full h-full"
        >
          Convertor
        </button>
      </div>
    </div>
  );
};

export default CoinConverterToggle;

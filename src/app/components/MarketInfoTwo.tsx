"use client";
import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "@/redux/store";

type MarketInfoPropsType = {
  title: string;
  data: string | undefined;
  symbol: string | undefined;
  textColor: string;
};

const MarketInfoTwo: React.FC<MarketInfoPropsType> = (props) => {
  const { title, data, symbol, textColor } = props;

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);
  return (
    <div className="flex mb-2">
      <PlusIcon className="w-5 h-5 p-1 bg-blue-500 rounded mr-3" />
      <h3 className="mr-3 text-sm">
        <span
          className={`font-extrabold ${
            textColor === "text-green-500" || textColor === "text-blue-500"
              ? textColor
              : isDarkMode
              ? "text-white"
              : "text-black"
          }`}
        >
          {title}:
        </span>{" "}
        {data} {symbol}
      </h3>
    </div>
  );
};

export default MarketInfoTwo;

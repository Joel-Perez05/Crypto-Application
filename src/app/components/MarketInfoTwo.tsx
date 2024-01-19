"use client";
import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

type MarketInfoPropsType = {
  title: string;
  data: string | undefined;
  symbol: string | undefined;
  textColor: string;
};

const MarketInfoTwo: React.FC<MarketInfoPropsType> = (props) => {
  const { title, data, symbol, textColor } = props;

  return (
    <div className="flex mb-2">
      <PlusIcon className="w-5 h-5 p-1 bg-blue-500 rounded mr-3" />
      <h3 className="mr-3 text-sm">
        <span className={`font-extrabold ${textColor}`}>{title}:</span> {data}{" "}
        {symbol}
      </h3>
    </div>
  );
};

export default MarketInfoTwo;

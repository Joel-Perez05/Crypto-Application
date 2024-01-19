"use client";
import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";

type MarketCapInfoPropsType = {
  roundedMarketCap: string | undefined;
  marketData: number | undefined;
  roundedPercentChange: string | undefined;
};

const MarketInfoMarketCap: React.FC<MarketCapInfoPropsType> = (props) => {
  const { roundedMarketCap, marketData, roundedPercentChange } = props;

  return (
    <div className="flex mb-2">
      <PlusIcon className="w-5 h-5 p-1 bg-blue-500 rounded mr-3" />
      <h3 className="mr-3 text-sm">
        <span className="font-extrabold">Market Cap:</span> ${roundedMarketCap}
      </h3>
      <h3
        className={`${
          marketData !== undefined && marketData < 0
            ? "text-red-600"
            : "text-green-600"
        } flex items-center text-sm`}
      >
        {" "}
        <span className="">
          {marketData !== undefined && marketData < 0 ? (
            <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
          ) : (
            <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
          )}
        </span>
        {roundedPercentChange}%
      </h3>
    </div>
  );
};

export default MarketInfoMarketCap;

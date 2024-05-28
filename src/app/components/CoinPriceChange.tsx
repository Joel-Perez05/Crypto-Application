"use client";
import React from "react";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";

type CoinPercentChange = {
  percentChangeRounded: string;
  percentChangeActual: number;
};

const CoinPriceChange: React.FC<CoinPercentChange> = (props) => {
  return (
    <div className="w-72 h-4 flex items-center">
      <p>
        {props.percentChangeActual < 0 ? (
          <ArrowTrendingDownIcon className="w-3 h-3 text-[#FE2264]" />
        ) : (
          <ArrowTrendingUpIcon className="w-3 h-3 text-[#00B1A7]" />
        )}
      </p>
      <p
        className={`${
          props.percentChangeActual < 0 ? "text-[#FE2264]" : "text-[#00B1A7]"
        } text-sm`}
      >
        {props.percentChangeRounded}%
      </p>
    </div>
  );
};

export default CoinPriceChange;

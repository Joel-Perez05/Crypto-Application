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
    <div
      className={`${
        props.percentChangeActual < 0 ? "text-red-600" : "text-green-600"
      } flex justify-center`}
    >
      <span>
        {props.percentChangeActual < 0 ? (
          <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
        ) : (
          <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
        )}
      </span>
      {props.percentChangeRounded}%
    </div>
  );
};

export default CoinPriceChange;

"use client";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import { formatToNearestHundreth } from "../utils/formatFunctions";

type TotalMarketPercentChangePropsType = {
  percentChange: number | undefined;
};

const TotalMarketPercentChange: React.FC<TotalMarketPercentChangePropsType> = (
  props
) => {
  const { percentChange } = props;

  const formattedPercent = formatToNearestHundreth(percentChange);

  return (
    <div className="flex items-center max-sm:hidden">
      <h2 className={`dark:text-white text-black mr-2`}>
        Market: {formattedPercent}%
      </h2>
      {percentChange !== undefined && percentChange > 0 ? (
        <ArrowTrendingUpIcon className="w-5 h-5 text-cyan-500" />
      ) : (
        <ArrowTrendingDownIcon className="w-5 h-5 text-red-500" />
      )}
    </div>
  );
};

export default TotalMarketPercentChange;

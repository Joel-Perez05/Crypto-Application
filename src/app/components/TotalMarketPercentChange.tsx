"use client";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import { formatToNearestTenth } from "../utils/formatFunctions";
import { useAppSelector } from "@/redux/store";

type TotalMarketPercentChangePropsType = {
  percentChange: number | undefined;
};

const TotalMarketPercentChange: React.FC<TotalMarketPercentChangePropsType> = (
  props
) => {
  const { percentChange } = props;

  const formattedPercent = formatToNearestTenth(percentChange);

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div className="flex items-center">
      <h2 className={`${isDarkMode ? "text-white" : "text-black"} mr-2`}>
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

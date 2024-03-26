"use client";
import React from "react";
import { PortfolioCoinData } from "../utils/CoinPageTypes";
import {
  formatToNearestTenth,
  getCircVsMax,
  getMarketToVolume,
} from "../utils/formatFunctions";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import ProgressBar from "@ramonak/react-progress-bar";
import { useAppSelector } from "@/redux/store";

type MarketDataInfoPropsTypes = {
  allCoins: PortfolioCoinData;
};

const MarketDataInfo: React.FC<MarketDataInfoPropsTypes> = (props) => {
  const { allCoins } = props;

  const supply = allCoins.max_supply
    ? allCoins.max_supply
    : allCoins.total_supply;
  const circulatingToMax = getCircVsMax(allCoins.circulating_supply, supply);
  const marketToVol = getMarketToVolume(
    allCoins.market_cap,
    allCoins.total_volume
  );
  const formattedPercent = formatToNearestTenth(
    allCoins.price_change_percentage_24h
  );
  const formattedPrice = formatToNearestTenth(allCoins.current_price);
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={`flex flex-col justify-evenly h-full w-3/4 rounded-r-md ${
        isDarkMode ? "bg-custom-asset2" : "bg-gray-300"
      }`}
    >
      <div className="flex justify-evenly">
        <div className="flex flex-col justify-evenly h-20 w-2/5 rounded-md border border-[#212140] p-2">
          <h2
            className={`${isDarkMode ? "text-white" : "text-black"} text-2xl`}
          >
            ${formattedPrice}
          </h2>
          <h3 className="text-gray-500">Current Price</h3>
        </div>
        <div className="flex flex-col justify-evenly h-20 w-2/5 rounded-md border border-[#212140] p-2">
          <div className="flex items-center">
            {allCoins.price_change_percentage_24h > 0 ? (
              <ArrowTrendingUpIcon className="text-cyan-400 w-5 h-5 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="text-red-500 w-5 h-5 mr-1" />
            )}
            <h2
              className={`${
                allCoins.price_change_percentage_24h > 0
                  ? "text-cyan-400"
                  : "text-red-500"
              } text-2xl`}
            >
              {formattedPercent}%
            </h2>
          </div>
          <h3 className="text-gray-500">24h%</h3>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div className="flex flex-col justify-evenly h-20 w-2/5 rounded-md border border-[#212140] p-2">
          <div className="flex items-center">
            <h2 className="text-cyan-400 text-2xl mr-4">{marketToVol}%</h2>
            <ProgressBar
              completed={allCoins.total_volume}
              maxCompleted={allCoins.market_cap}
              bgColor="#22d3ee"
              baseBgColor="#0f766e"
              height="10px"
              width="150px"
              isLabelVisible={false}
              className=""
            />
          </div>
          <h3 className="text-gray-500">Volume vs Market Cap</h3>
        </div>
        <div className="flex flex-col justify-evenly h-20 w-2/5 rounded-md border border-[#212140] p-2">
          <h2 className="text-cyan-400 text-2xl">{circulatingToMax}%</h2>
          <h3 className="text-gray-500">Circ Supply vs Max Supply</h3>
        </div>
      </div>
    </div>
  );
};

export default MarketDataInfo;

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
import { useSelectedCurrency } from "@/redux/features/currency-Slice";

type MarketDataInfoPropsTypes = {
  allCoins: PortfolioCoinData;
};

const MarketDataInfo: React.FC<MarketDataInfoPropsTypes> = (props) => {
  const { allCoins } = props;

  const selectedCurrency = useSelectedCurrency();

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
      className={`flex flex-col justify-evenly h-full w-916 max-sm:rounded-b-md md:rounded-r-md max-sm:p-1 ${
        isDarkMode ? "bg-[#191925]" : "bg-gray-300"
      }`}
    >
      <div className="flex justify-evenly max-sm:mt-2">
        <div className="flex flex-col justify-evenly h-74 w-432 rounded-md border border-[#2D2D51] p-2">
          <h2
            className={`${
              isDarkMode ? "text-white" : "text-black"
            } font-medium text-xl`}
          >
            {selectedCurrency.symbol}
            {formattedPrice}
          </h2>
          <h3 className="text-[#D1D1D1] text-sm">Current Price</h3>
        </div>
        <div className="flex flex-col justify-evenly h-74 w-432 rounded-md border border-[#2D2D51] p-2">
          <div className="flex items-center">
            {allCoins.price_change_percentage_24h > 0 ? (
              <ArrowTrendingUpIcon className="text-[#01F1E3] w-4 h-4 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="text-red-500 w-4 h-4 mr-1" />
            )}
            <h2
              className={`${
                allCoins.price_change_percentage_24h > 0
                  ? "text-[#01F1E3]"
                  : "text-red-500"
              } font-medium text-xl`}
            >
              {formattedPercent}%
            </h2>
          </div>
          <h3 className="text-[#D1D1D1] text-sm">24h%</h3>
        </div>
      </div>
      <div className="flex justify-evenly max-sm:mt-2 max-sm:mb-2">
        <div className="flex flex-col justify-evenly h-74 w-432 rounded-md border border-[#2D2D51] p-2">
          <div className="flex items-center">
            <h2 className="text-[#01F1E3] font-medium text-xl mr-4">
              {marketToVol}%
            </h2>
            <ProgressBar
              completed={allCoins.total_volume}
              maxCompleted={allCoins.market_cap}
              bgColor="#01F1E3"
              baseBgColor="#0f766e"
              height="6px"
              width="340px"
              isLabelVisible={false}
              className=""
            />
          </div>
          <h3 className="text-[#D1D1D1] text-sm">Volume vs Market Cap</h3>
        </div>
        <div className="flex flex-col justify-evenly h-74 w-432 rounded-md border border-[#2D2D51] p-2">
          <h2 className="text-[#01F1E3] font-medium text-xl">
            {circulatingToMax}%
          </h2>
          <h3 className="text-[#D1D1D1] text-xs">Circ Supply vs Max Supply</h3>
        </div>
      </div>
    </div>
  );
};

export default MarketDataInfo;

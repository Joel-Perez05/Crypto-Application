"use client";
import React, { useEffect, useState } from "react";
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

type MarketDataInfoPropsTypes = {
  allCoins: PortfolioCoinData;
};

const MarketDataInfo: React.FC<MarketDataInfoPropsTypes> = (props) => {
  const { allCoins } = props;
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [twentyFourHourPercent, setTwentyFourHourPercent] =
    useState<string>("");
  const [marketToVolume, setMarketToVolume] = useState<string>("");
  const [circVsMax, setCircVsMax] = useState<string>("");

  useEffect(() => {
    const supply = allCoins.max_supply
      ? allCoins.max_supply
      : allCoins.total_supply;
    const formattedPrice = formatToNearestTenth(allCoins.current_price);
    setCurrentPrice(formattedPrice!);
    const formattedPercent = formatToNearestTenth(
      allCoins.price_change_percentage_24h
    );
    setTwentyFourHourPercent(formattedPercent!);
    const marketToVol = getMarketToVolume(
      allCoins.market_cap,
      allCoins.total_volume
    );
    setMarketToVolume(marketToVol!);
    const circulatingToMax = getCircVsMax(allCoins.circulating_supply, supply);
    setCircVsMax(circulatingToMax!);
  }, []);

  return (
    <div className="flex flex-col justify-evenly h-full w-3/4 rounded-r-md bg-custom-asset2">
      <div className="flex justify-evenly">
        <div className="flex flex-col justify-evenly h-20 w-2/5 rounded-md border border-[#212140] p-2">
          <h2 className="text-white text-2xl">${currentPrice}</h2>
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
              {twentyFourHourPercent}%
            </h2>
          </div>
          <h3 className="text-gray-500">24h%</h3>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div className="flex flex-col justify-evenly h-20 w-2/5 rounded-md border border-[#212140] p-2">
          <div className="flex items-center">
            <h2 className="text-cyan-400 text-2xl mr-4">{marketToVolume}%</h2>
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
          <h2 className="text-cyan-400 text-2xl">{circVsMax}%</h2>
          <h3 className="text-gray-500">Circ Supply vs Max Supply</h3>
        </div>
      </div>
    </div>
  );
};

export default MarketDataInfo;

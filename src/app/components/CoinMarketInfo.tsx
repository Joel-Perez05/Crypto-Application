"use client";
import React from "react";
import {
  convertToShorterNum,
  formatToNearestTenth,
  getTotalVol,
  getVolToMarket,
} from "../utils/formatFunctions";
import { CoinType } from "../coin/[id]/page";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import numeral from "numeral";
import ProgressBar from "@ramonak/react-progress-bar";

type MarketPropsType = {
  symbol: CoinType["symbol"];
  market_data: CoinType["market_data"];
};

const CoinMarketInfo: React.FC<MarketPropsType> = (props) => {
  const { symbol, market_data } = props;

  const allCaps = symbol?.toUpperCase();

  const roundedMarketCap = convertToShorterNum(market_data?.market_cap.usd);
  const roundedPercentChange = formatToNearestTenth(
    market_data?.market_cap_change_percentage_24h
  );
  const roundedValuation = convertToShorterNum(
    market_data?.fully_diluted_valuation.usd
  );
  const roundedVolume = convertToShorterNum(market_data?.total_volume.usd);
  const totalVolume = getTotalVol(
    market_data?.total_volume.usd,
    market_data?.high_24h.usd
  );
  const circulatingSupply = numeral(market_data?.circulating_supply).format(
    "00,000"
  );
  const maxSupply = numeral(market_data?.max_supply).format("00,000");

  const volumeToMarket = getVolToMarket(
    market_data?.total_volume.usd,
    market_data?.market_cap.usd
  );

  return (
    <div className="text-white bg-custom-dark2 w-96 h-64 rounded-2xl p-4">
      <div className="mb-6">
        <div className="flex mb-2">
          <PlusIcon className="w-5 h-5 p-1 bg-blue-500 rounded mr-3" />
          <h3 className="mr-3 text-sm">
            <span className="font-extrabold">Market Cap:</span> $
            {roundedMarketCap}
          </h3>
          <h3
            className={`${
              market_data?.market_cap_change_percentage_24h !== undefined &&
              market_data?.market_cap_change_percentage_24h < 0
                ? "text-red-600"
                : "text-green-600"
            } flex items-center text-sm`}
          >
            {" "}
            <span className="">
              {market_data?.market_cap_change_percentage_24h !== undefined &&
              market_data?.market_cap_change_percentage_24h < 0 ? (
                <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
              ) : (
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
              )}
            </span>
            {roundedPercentChange}%
          </h3>
        </div>
        <div className="flex mb-2">
          <PlusIcon className="w-5 h-5 p-1 bg-blue-500 rounded mr-3" />
          <h3 className="mr-3 text-sm">
            <span className="font-extrabold">Fully Diluted Valuation:</span> $
            {roundedValuation}
          </h3>
        </div>
        <div className="flex mb-2">
          <PlusIcon className="w-5 h-5 p-1 bg-blue-500 rounded mr-3" />
          <h3 className="mr-3 text-sm">
            <span className="font-extrabold">Volume 24h:</span> ${roundedVolume}
          </h3>
        </div>
        <div className="flex mb-2">
          <PlusIcon className="w-5 h-5 p-1 bg-blue-500 rounded mr-3" />
          <h3 className="mr-3 text-sm">
            <span className="font-extrabold mr-1">Volume / Market:</span>
            {volumeToMarket}...
          </h3>
        </div>
      </div>
      <div>
        <div className="flex mb-2">
          <PlusIcon className="w-5 h-5 p-1 bg-blue-500 rounded mr-3" />
          <h3 className="mr-3 text-sm">
            <span className="font-extrabold text-green-500">Total Volume:</span>{" "}
            {totalVolume} {allCaps}
          </h3>
        </div>
        <div className="flex mb-2">
          <PlusIcon className="w-5 h-5 p-1 bg-blue-500 rounded mr-3" />
          <h3 className="mr-3 text-sm">
            <span className="font-extrabold">Circulating Supply:</span>{" "}
            {circulatingSupply} {allCaps}
          </h3>
        </div>
        <div className="flex mb-2">
          <PlusIcon className="w-5 h-5 p-1 bg-blue-500 rounded mr-3" />
          <h3 className="mr-3 text-sm">
            <span className="font-extrabold text-blue-500">Max Supply:</span>{" "}
            {maxSupply} {allCaps}
          </h3>
        </div>
        <div>
          <ProgressBar
            completed={market_data?.circulating_supply ?? 0}
            maxCompleted={market_data?.max_supply ?? 0}
            bgColor="white"
            baseBgColor="#3b82f6"
            height="10px"
            width="70%"
            isLabelVisible={false}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default CoinMarketInfo;

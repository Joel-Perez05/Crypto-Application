"use client";
import React from "react";
import {
  convertToShorterNum,
  formatToNearestTenth,
  getTotalVol,
  getVolToMarket,
} from "../utils/formatFunctions";
import { CoinType } from "../utils/CoinPageTypes";
import numeral from "numeral";
import ProgressBar from "@ramonak/react-progress-bar";
import MarketInfoTwo from "./MarketInfoTwo";
import MarketInfoMarketCap from "./MarketInfoMarketCap";
import MarketInfoOne from "./MarketInfoOne";
import { useAppSelector } from "@/redux/store";

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

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={`${
        isDarkMode ? "text-white bg-custom-dark2 " : "text-black bg-gray-300"
      } w-96 h-64 rounded-2xl p-4`}
    >
      <div className="mb-6">
        <div>
          <MarketInfoMarketCap
            roundedMarketCap={roundedMarketCap}
            marketData={market_data?.market_cap_change_percentage_24h}
            roundedPercentChange={roundedPercentChange}
          />
        </div>
        <div>
          <MarketInfoOne
            title="Fully Diluted Valuation"
            data={roundedValuation}
          />
        </div>
        <div>
          <MarketInfoOne title="Volume 24h" data={roundedVolume} />
        </div>
        <div>
          <MarketInfoOne title="Volume / Market" data={volumeToMarket} />
        </div>
      </div>
      <div>
        <div>
          <MarketInfoTwo
            title="Total Volume"
            data={totalVolume}
            symbol={allCaps}
            textColor="text-green-500"
          />
        </div>
        <div>
          <MarketInfoTwo
            title="Circulating Supply"
            data={circulatingSupply}
            symbol={allCaps}
            textColor="text-white"
          />
        </div>
        <div>
          <MarketInfoTwo
            title="Max Supply"
            data={maxSupply}
            symbol={allCaps}
            textColor="text-blue-500"
          />
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

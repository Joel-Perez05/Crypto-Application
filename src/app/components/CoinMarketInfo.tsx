"use client";
import React from "react";
import {
  convertMarketCap,
  formatToNearestTenth,
  getTotalVol,
  getVolToMarket,
} from "../utils/formatFunctions";
import { CoinType } from "../utils/CoinPageTypes";
import numeral from "numeral";
import ProgressBar from "@ramonak/react-progress-bar";
import MarketInfoDataTwo from "./MarketInfoDataTwo";
import MarketInfoData from "./MarketInfoData";
import { useAppSelector } from "@/redux/store";
import { useSelectedCurrency } from "@/redux/features/currency-Slice";

type MarketPropsType = {
  symbol: CoinType["symbol"];
  market_data: CoinType["market_data"];
};

const CoinMarketInfo: React.FC<MarketPropsType> = (props) => {
  const { symbol, market_data } = props;

  const selectedCurrency = useSelectedCurrency();

  const allCaps = symbol?.toUpperCase();

  const roundedMarketCap = convertMarketCap(
    market_data?.market_cap[selectedCurrency.currency]
  );
  const roundedPercentChange = formatToNearestTenth(
    market_data?.market_cap_change_percentage_24h
  );
  const roundedValuation = convertMarketCap(
    market_data?.fully_diluted_valuation[selectedCurrency.currency]
  );
  const roundedVolume = convertMarketCap(
    market_data?.total_volume[selectedCurrency.currency]
  );
  const totalVolume = getTotalVol(
    market_data?.total_volume[selectedCurrency.currency],
    market_data?.high_24h[selectedCurrency.currency]
  );
  const circulatingSupply = numeral(market_data?.circulating_supply).format(
    "00,000"
  );
  const maxSupply = numeral(market_data?.max_supply).format("00,000");

  const volumeToMarket = getVolToMarket(
    market_data?.total_volume[selectedCurrency.currency],
    market_data?.market_cap[selectedCurrency.currency]
  );

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={`${
        isDarkMode ? "text-white bg-[#1f1833]" : "text-black bg-white"
      } md:w-full max-sm:w-full h-96 rounded-2xl p-10`}
    >
      <div className="mb-6 md:w-full">
        <div className="flex justify-center">
          <MarketInfoData title="Market Cap" data={roundedMarketCap} />
        </div>
        <div className="flex justify-center">
          <MarketInfoData
            title="Fully Diluted Valuation"
            data={roundedValuation}
          />
        </div>
        <div className="flex justify-center">
          <MarketInfoData title="Volum 24h" data={roundedVolume} />
        </div>
        <div className="flex justify-center">
          <MarketInfoData title="Volume/Market" data={volumeToMarket} />
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <MarketInfoDataTwo
            title="Total Volume"
            data={totalVolume}
            symbol={allCaps}
          />
        </div>
        <div className="flex justify-center">
          <MarketInfoDataTwo
            title="Circulating Supply"
            data={circulatingSupply}
            symbol={allCaps}
          />
        </div>
        <div className="flex justify-center">
          <MarketInfoDataTwo
            title="Max Supply"
            data={maxSupply}
            symbol={allCaps}
          />
        </div>
        <div className="flex justify-center">
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

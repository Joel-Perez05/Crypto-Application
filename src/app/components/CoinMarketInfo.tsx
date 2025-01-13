"use client";
import React from "react";
import {
  convertMarketCap,
  formatToNearestHundreth,
  getCircVsMaxWhole,
  getTotalVol,
  getVolToMarket,
} from "../utils/formatFunctions";
import { CoinType } from "../utils/CoinPageTypes";
import numeral from "numeral";
import ProgressBar from "@ramonak/react-progress-bar";
import MarketInfoDataTwo from "./MarketInfoDataTwo";
import MarketInfoData from "./MarketInfoData";
import { useAppSelector } from "@/redux/store";

type MarketPropsType = {
  symbol: CoinType["symbol"];
  market_data: CoinType["market_data"];
};

const CoinMarketInfo: React.FC<MarketPropsType> = (props) => {
  const { symbol, market_data } = props;

  const selectedCurrency = useAppSelector((state) => state.currency);

  const allCaps = symbol?.toUpperCase();

  const roundedMarketCap = convertMarketCap(
    market_data?.market_cap[selectedCurrency.currency]
  );
  const roundedPercentChange = formatToNearestHundreth(
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
  const maxSupply = numeral(
    market_data?.max_supply
      ? market_data?.max_supply
      : market_data?.total_supply
  ).format("00,000");

  const volumeToMarket = getVolToMarket(
    market_data?.total_volume[selectedCurrency.currency],
    market_data?.market_cap[selectedCurrency.currency]
  );

  const circulatingPercent = getCircVsMaxWhole(
    market_data?.circulating_supply,
    market_data?.max_supply
      ? market_data?.max_supply
      : market_data?.total_supply
  );

  const maxSupplyPercent = circulatingPercent
    ? 100 - parseFloat(circulatingPercent)
    : 100;

  return (
    <div
      className={`dark:text-white dark:bg-[#1E1932] text-black bg-white w-544 h-full rounded-2xl p-10`}
    >
      <div className="mb-6 w-409 h-36 ml-4">
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
      <div className="w-409 h-104 ml-4">
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
        <div className="mt-6 w-432 h-7">
          <div className="flex justify-between items-center md:text-sm mb-1">
            <h3 className="text-[#D4770C]">●{circulatingPercent}%</h3>
            <h3 className="text-[#F8D2A6]">●{maxSupplyPercent}%</h3>
          </div>
          <ProgressBar
            completed={market_data?.circulating_supply ?? 0}
            maxCompleted={market_data?.max_supply ?? 0}
            bgColor="#D4770C"
            baseBgColor="#F8D2A6"
            height="8px"
            width="100%"
            isLabelVisible={false}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default CoinMarketInfo;

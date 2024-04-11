"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MarketOverviewTypes,
  MarketPercentageTypes,
} from "../utils/CoinPageTypes";
import { bitcoin, ethereum } from "../utils/photos";
import TotalCoins from "./TotalCoins";
import TotalExchanges from "./TotalExchanges";
import MarketCapPercentage from "./MarketCapPercentage";
import TotalMarketPercentChange from "./TotalMarketPercentChange";
import { useAppSelector } from "@/redux/store";

const OverviewMarketData = () => {
  const [totalCoins, setTotalCoins] = useState<MarketOverviewTypes>();
  const [marketCap, setMarketCap] = useState<MarketPercentageTypes>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marketDataResponse = await axios.get(
          `https://api.coingecko.com/api/v3/global`
        );
        setTotalCoins(marketDataResponse.data.data);
        setMarketCap(marketDataResponse.data.data.market_cap_percentage);
      } catch (error: any) {
        console.error("Error fetching Market Data", error);
      }
    };
    fetchData();
  }, []);

  const bitcoinImg: string = bitcoin;
  const ethereumImg: string = ethereum;
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={`sticky top-0 z-50 flex justify-center w-full xs:w-full md:h-16 bg-gradient-to-r ${
        isDarkMode
          ? "from-[#212140] via-[#500724] via-30% to-[#14142b] text-white"
          : "from-white via-gray-500 to-cyan-400 text-black"
      }`}
    >
      <div className="flex max-sm:text-sm justify-evenly xs:w-full h-full md:w-full xl:w-1/2 p-4">
        <TotalCoins totalCoins={totalCoins?.active_cryptocurrencies} />
        <TotalExchanges totalExchanges={totalCoins?.markets} />
        <TotalMarketPercentChange
          percentChange={totalCoins?.market_cap_change_percentage_24h_usd}
        />
        <MarketCapPercentage
          image={bitcoinImg}
          marketCap={marketCap?.btc}
          color={"#f59e0b"}
        />
        <MarketCapPercentage
          image={ethereumImg}
          marketCap={marketCap?.eth}
          color={"#3730a3"}
        />
      </div>
    </div>
  );
};

export default OverviewMarketData;

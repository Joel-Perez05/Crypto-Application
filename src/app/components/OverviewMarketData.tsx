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
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div className="w-full dark:bg-[#13121A] bg-white flex justify-center">
      <div
        className="sticky border rounded-md border-gray-700 top-0 z-50 flex justify-center w-1440 h-56 py-8 
        dark:bg-[#1E1932] text-white bg-[#353570] 
        "
      >
        <div className="flex gap-x-8 text-xs justify-center w-full">
          <TotalCoins totalCoins={totalCoins?.active_cryptocurrencies} />
          <TotalExchanges totalExchanges={totalCoins?.markets} />
          <TotalMarketPercentChange
            percentChange={totalCoins?.market_cap_change_percentage_24h_usd}
          />
          <MarketCapPercentage
            image={bitcoinImg}
            marketCap={marketCap?.btc}
            color={"#F7931A"}
          />
          <MarketCapPercentage
            image={ethereumImg}
            marketCap={marketCap?.eth}
            color={"#849DFF"}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewMarketData;

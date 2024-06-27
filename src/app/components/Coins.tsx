"use client";
import { useEffect, useState } from "react";
import CoinName from "./CoinName";
import CoinPriceChange from "./CoinPriceChange";
import InfiniteScroll from "react-infinite-scroll-component";
import { AdjustmentsVerticalIcon } from "@heroicons/react/20/solid";
import numeral from "numeral";
import axios from "axios";
import { ChartData } from "chart.js";
import classes from "../../styles/scrollbar.module.css";
import CoinProgressBars from "./CoinProgressBars";
import CoinLineGraph from "./CoinLineGraph";
import { useAppSelector } from "@/redux/store";
import { useSelectedCurrency } from "@/redux/features/currency-Slice";
import CoinTableHeader from "./CoinTableHeader";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  market_cap: number;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number;
  sparkline_in_7d: SparklinePrice;
};

type SparklinePrice = {
  price: [number];
};
export default function Coins() {
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(10);
  const [sparklinePrices, setSparklinePrices] = useState<[]>([]);

  const selectedCurrency = useSelectedCurrency();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency.currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        );
        setAllCoins(coinResponse.data);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [displayCount, selectedCurrency]);

  const roundToSixth = (number: number) => {
    const rounded = Math.round(number * 1e6) / 1e6;
    if (number < 1) {
      return numeral(rounded).format("0.000000");
    } else return numeral(rounded).format("0,000");
  };

  const formatToNearestTenth = (number: number) => {
    const roundedPercent = Math.ceil(number * 10) / 10;
    return numeral(roundedPercent).format("0.0");
  };

  const convertToShorterNum = (number: number) => {
    if (number >= 1000000000000) {
      return numeral(number / 1000000000000).format("0.00") + "T";
    } else if (number >= 1000000000) {
      return numeral(number / 1000000000).format("0.00") + "B";
    } else if (number >= 1000000) {
      return numeral(number / 1000000).format("0.00") + "M";
    } else if (number >= 100000) {
      return numeral(number / 100000).format("0.00") + "K";
    } else {
      return numeral(number).format("0,0");
    }
  };

  const handleNext = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div className={`${isDarkMode ? "bg-[#13121A]" : "bg-white"} w-full h-816`}>
      <CoinTableHeader />
      <InfiniteScroll
        dataLength={displayCount}
        next={handleNext}
        hasMore={displayCount < 50}
        loader={<h4>Loading...</h4>}
        height={766}
        className={classes.customInfiniteScroll}
      >
        {allCoins.map((coin, idx) => {
          const allCaps = coin.symbol.toUpperCase();
          const price = roundToSixth(coin.current_price);
          const pricePercent1 = formatToNearestTenth(
            coin.price_change_percentage_1h_in_currency
          );
          const pricePercent24 = formatToNearestTenth(
            coin.price_change_percentage_24h_in_currency
          );
          const pricePercent7 = formatToNearestTenth(
            coin.price_change_percentage_7d_in_currency
          );
          const totalVolume = convertToShorterNum(coin.total_volume);
          const totalMarket = convertToShorterNum(coin.market_cap);
          const circulating = convertToShorterNum(coin.circulating_supply);
          const totalSupply = convertToShorterNum(coin.total_supply);
          const color =
            coin.price_change_percentage_7d_in_currency < 0
              ? "#FE2264"
              : "#00B1A7";
          const darkmode = isDarkMode ? "#191925" : "#FFFFFF";
          return (
            <div
              className={`flex mt-2 items-center justify-evenly w-full h-77 rounded-md  ${
                isDarkMode ? "text-white bg-[#191925]" : "text-black bg-white"
              }`}
              key={coin.id}
            >
              <p className="w-4 h-6">{idx + 1}</p>
              <CoinName
                coinId={coin.id}
                coinName={coin.name}
                coinNameAllCaps={allCaps}
                coinImg={coin.image}
              />
              <p className="w-20 h-6">
                {selectedCurrency.symbol}
                {price}
              </p>
              <CoinPriceChange
                percentChangeRounded={pricePercent1}
                percentChangeActual={
                  coin.price_change_percentage_1h_in_currency
                }
              />
              <CoinPriceChange
                percentChangeRounded={pricePercent24}
                percentChangeActual={
                  coin.price_change_percentage_24h_in_currency
                }
              />
              <CoinPriceChange
                percentChangeRounded={pricePercent7}
                percentChangeActual={
                  coin.price_change_percentage_7d_in_currency
                }
              />
              <CoinProgressBars
                percentChangeActual={
                  coin.price_change_percentage_7d_in_currency
                }
                titleCompleted={totalVolume}
                completed={coin.total_volume}
                titleMaxCompleted={totalMarket}
                maxCompleted={coin.market_cap}
              />
              <CoinProgressBars
                percentChangeActual={
                  coin.price_change_percentage_7d_in_currency
                }
                titleCompleted={circulating}
                completed={coin.circulating_supply}
                titleMaxCompleted={totalSupply}
                maxCompleted={coin.total_supply}
              />
              <CoinLineGraph
                darkmode={darkmode}
                color={color}
                prices={coin.sparkline_in_7d.price}
              />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

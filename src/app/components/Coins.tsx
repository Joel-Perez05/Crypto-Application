"use client";
import { useEffect, useState } from "react";
import CoinName from "./CoinName";
import CoinPriceChange from "./CoinPriceChange";
import numeral from "numeral";
import axios from "axios";
import CoinProgressBars from "./CoinProgressBars";
import CoinLineGraph from "./CoinLineGraph";
import CoinTableHeader from "./CoinTableHeader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setSortedCoins } from "@/redux/features/sort-Slice";
import { useAppSelector } from "@/redux/store";

const Coins = () => {
  const [displayCount, setDisplayCount] = useState<number>(10);

  const selectedCurrency = useAppSelector((state) => state.currency);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinResponse = await axios.get("/api/landingPage/getCoinsTable", {
          params: {
            vs_currency: selectedCurrency.currency,
            per_page: 50,
          },
        });
        dispatch(setSortedCoins(coinResponse.data));
      } catch (error: any) {
        console.error("Error fetching coin table data:", error.message);
      }
    };
    fetchData();
  }, [displayCount, selectedCurrency.currency, dispatch]);

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

  const sortedCoins = useAppSelector((state) => state.sort.sortedCoins);

  return (
    <div className={`dark:bg-[#13121A] bg-[#f2f2fd] w-full h-full mb-10`}>
      <CoinTableHeader />
      {sortedCoins.map((coin, idx) => {
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
        const colorTwo =
          coin.price_change_percentage_7d_in_currency < 0
            ? "#fe22646c"
            : "#00b1a856";
        return (
          <div
            className={`flex mt-2 items-center justify-evenly w-full h-77 rounded-md dark:text-white dark:bg-[#191925] text-[#232336] bg-white`}
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
              percentChangeActual={coin.price_change_percentage_1h_in_currency}
            />
            <CoinPriceChange
              percentChangeRounded={pricePercent24}
              percentChangeActual={coin.price_change_percentage_24h_in_currency}
            />
            <CoinPriceChange
              percentChangeRounded={pricePercent7}
              percentChangeActual={coin.price_change_percentage_7d_in_currency}
            />
            <CoinProgressBars
              percentChangeActual={coin.price_change_percentage_7d_in_currency}
              titleCompleted={totalVolume}
              completed={coin.total_volume}
              titleMaxCompleted={totalMarket}
              maxCompleted={coin.market_cap}
            />
            <CoinProgressBars
              percentChangeActual={coin.price_change_percentage_7d_in_currency}
              titleCompleted={circulating}
              completed={coin.circulating_supply}
              titleMaxCompleted={totalSupply}
              maxCompleted={coin.total_supply}
            />
            <CoinLineGraph
              color={color}
              colorTwo={colorTwo}
              prices={coin.sparkline_in_7d.price}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Coins;

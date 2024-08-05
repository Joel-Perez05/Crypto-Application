"use client";
import React, { useEffect } from "react";
import axios from "axios";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import TimeIntervalSelector from "./TimeIntervalSelector";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toggleGraph } from "@/redux/features/graphs-slice";
import CoinCarousel from "./CoinCarousel";

const HomePageGraphs = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedCurrency = useAppSelector((state) => state.currency);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marketChartRes = await axios.get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${selectedCurrency.currency}&days=365&interval=daily`
        );

        dispatch(
          toggleGraph({
            name: "bitcoin",
            prices: marketChartRes.data.prices,
            volume: marketChartRes.data.volume,
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedCurrency.currency]);

  return (
    <div className="flex flex-col justify-between w-full h-694 mb-14 mt-14">
      <CoinCarousel />
      <div className="w-full h-502 flex flex-col justify-between">
        <div className="flex justify-between h-404 w-full">
          <LineChart />
          <BarChart />
        </div>
        <TimeIntervalSelector />
      </div>
    </div>
  );
};

export default HomePageGraphs;

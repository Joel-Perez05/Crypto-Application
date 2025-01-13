"use client";
import React, { useEffect } from "react";
import axios from "axios";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import TimeIntervalSelector from "./TimeIntervalSelector";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toggleInitialGraph } from "@/redux/features/graphs-slice";
import CoinCarousel from "./CoinCarousel";

const HomePageGraphs = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedCurrency = useAppSelector((state) => state.currency);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await axios.get(
          `/api/landingPage/getHomePageGraphsData`,
          {
            params: {
              vs_currency: selectedCurrency.currency,
            },
          }
        );
        const priceAndVol = await axios.get(
          "/api/landingPage/getHomePageDailyData",
          {
            params: {
              vs_currency: selectedCurrency.currency,
            },
          }
        );
        dispatch(
          toggleInitialGraph({
            name: "bitcoin",
            pricesArr: chartData.data.prices,
            volumeArr: chartData.data.total_volumes,
            price: priceAndVol.data.bitcoin[`${selectedCurrency.currency}`],
            volume:
              priceAndVol.data.bitcoin[`${selectedCurrency.currency}_24h_vol`],
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedCurrency.currency, dispatch]);

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

"use client";
import React, { SetStateAction } from "react";
import axios from "axios";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ChartBarIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { toggleInitialGraph } from "@/redux/features/graphs-slice";

type CarsouselHeaderPropsTypes = {
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setCoinNameArr: React.Dispatch<React.SetStateAction<string[]>>;
};

const CarsouselHeader: React.FC<CarsouselHeaderPropsTypes> = (props) => {
  const { isSelected, setIsSelected, setCoinNameArr } = props;
  const dispatch = useDispatch<AppDispatch>();
  const selectedCurrency = useAppSelector((state) => state.currency);

  const handleChartReset = async () => {
    setCoinNameArr([]);
    setIsSelected(!isSelected);
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

  return (
    <div className="w-full h-12 flex justify-between ">
      <div className="w-auto h-full flex flex-col justify-end">
        <p className="w-full h-5 dark:text-[#D1D1D1] text-[#424286] text-sm ">
          Select two currencies to view statistics.
        </p>
      </div>
      {!isSelected ? (
        <div className="w-143 h-full text-sm dark:bg-[#232336] bg-white dark:text-white text-[#353570] rounded-md flex justify-center items-center">
          <ChartBarIcon className="w-6 h-6 mr-2" />
          Compare
        </div>
      ) : (
        <button
          onClick={handleChartReset}
          className="w-192 h-full text-sm dark:bg-[#232336] bg-white dark:text-white text-[#353570] rounded-md flex justify-center items-center"
        >
          <XMarkIcon className="w-6 h-6 mr-2" />
          Exit comparison
        </button>
      )}
    </div>
  );
};

export default CarsouselHeader;

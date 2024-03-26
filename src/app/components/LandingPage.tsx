"use client";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Coins from "./Coins";
import { useAppSelector } from "@/redux/store";

export default function LandingPage() {
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <main
      className={`h-full md:w-full xl:w-1/2 p-4 ${
        isDarkMode ? "bg-custom-dark1" : "bg-white"
      }`}
    >
      <h2
        className={`${isDarkMode ? "text-white" : "text-black"} text-3xl mb-6`}
      >
        Your Overview
      </h2>
      <div className="flex justify-around">
        <div
          className={`rounded-2xl p-4 w-5/12 h-72 ${
            isDarkMode
              ? " text-white bg-custom-dark2"
              : "text-black bg-gray-300"
          }`}
        >
          <LineChart />
        </div>
        <div
          className={`rounded-2xl p-4 w-5/12 h-72 ${
            isDarkMode ? "text-white bg-custom-dark2" : "text-black bg-gray-300"
          } `}
        >
          <BarChart />
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <Coins />
      </div>
    </main>
  );
}

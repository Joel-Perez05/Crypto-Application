"use client";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Coins from "./Coins";
import { useAppSelector } from "@/redux/store";
import CoinConverterToggle from "./CoinConverterToggle";

export default function LandingPage() {
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <main
      className={`h-full w-1296 ${isDarkMode ? "bg-[#13121A]" : "bg-white"}`}
    >
      <CoinConverterToggle />
      <div className="flex justify-between w-full h-404 max-sm:flex-col">
        <div
          className={`rounded-xl w-632 h-full ${
            isDarkMode ? " text-white bg-[#1b1932]" : "text-black bg-gray-300"
          }`}
        >
          <LineChart />
        </div>
        <div
          className={`rounded-xl w-632 h-full ${
            isDarkMode ? "text-white bg-[#201932]" : "text-black bg-gray-300"
          } `}
        >
          <BarChart />
        </div>
      </div>
      <Coins />
    </main>
  );
}

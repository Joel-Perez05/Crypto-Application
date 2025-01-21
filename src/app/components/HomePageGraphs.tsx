"use client";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import TimeIntervalSelector from "./TimeIntervalSelector";

import CoinCarousel from "./CoinCarousel";

const HomePageGraphs = () => {
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

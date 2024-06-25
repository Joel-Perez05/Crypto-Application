"use client";
import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { useAppSelector } from "@/redux/store";
import TimeIntervalSelector from "./TimeIntervalSelector";

const HomePageGraphs = () => {
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div className="flex flex-col justify-between w-full h-502 mb-14 mt-14">
      <div className="flex justify-between h-404">
        <LineChart />
        <BarChart />
      </div>
      <TimeIntervalSelector />
    </div>
  );
};

export default HomePageGraphs;

"use client";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useAppSelector } from "@/redux/store";

type ProgressBarType = {
  titleCompleted: string;
  completed: number;
  titleMaxCompleted: string;
  maxCompleted: number;
  percentChangeActual: number;
};

const CoinProgressBars: React.FC<ProgressBarType> = (props) => {
  const {
    titleCompleted,
    completed,
    titleMaxCompleted,
    maxCompleted,
    percentChangeActual,
  } = props;

  const selectedCurrency = useAppSelector((state) => state.currency);

  return (
    <div className="w-228 h-26">
      <div className="flex justify-between">
        <h3
          className={`text-xs ${
            percentChangeActual < 0 ? "text-[#FE2264]" : "text-[#00B1A7]"
          }`}
        >
          ●{selectedCurrency.symbol}
          {titleCompleted}
        </h3>
        <h3
          className={`text-xs ${
            percentChangeActual < 0 ? "text-[#FBBAD1]" : "text-[#AFE5E5]"
          }`}
        >
          ●{selectedCurrency.symbol}
          {titleMaxCompleted}
        </h3>
      </div>
      <ProgressBar
        completed={completed}
        maxCompleted={maxCompleted}
        bgColor={percentChangeActual < 0 ? "#FE2264" : "#00B1A7"}
        baseBgColor={percentChangeActual < 0 ? "#FBBAD1" : "#AFE5E5"}
        height="6px"
        width="100%"
        isLabelVisible={false}
      />
    </div>
  );
};

export default CoinProgressBars;

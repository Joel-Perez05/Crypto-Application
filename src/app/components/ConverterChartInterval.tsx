"use client";
import { toggleConvertorInterval } from "@/redux/features/interval-Slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const intervals = [
  { label: "1D", val: 24 },
  { label: "2D", val: 48 },
  { label: "3D", val: 72 },
  { label: "4D", val: 96 },
  { label: "5D", val: 120 },
  { label: "6D", val: 144 },
  { label: "7D", val: 168 },
];

const ConverterChartInterval = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleIntervalChange = (interval: number) => {
    dispatch(toggleConvertorInterval(interval));
  };

  const selectedInterval = useAppSelector(
    (state) => state.interval.converterInterval
  );

  return (
    <div className="w-463 h-42 rounded-md flex justify-between items-center p-1 dark:bg-[#232336] bg-[#ccccfa6c]">
      {intervals.map((int) => {
        return (
          <button
            key={int.label}
            onClick={() => handleIntervalChange(int.val)}
            className={`w-14 h-34 rounded-md ${
              selectedInterval === int.val
                ? "bg-[#6161d688] shadow-sm shadow-[#7878fa46]"
                : ""
            }  dark:text-[#E4E4F0] text-[#424286] text-sm `}
          >
            {int.label}
          </button>
        );
      })}
    </div>
  );
};

export default ConverterChartInterval;

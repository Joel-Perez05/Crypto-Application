"use client";
import { toggleInterval } from "@/redux/features/interval-Slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const intervals = [
  { label: "1D", val: 364 },
  { label: "7D", val: 357 },
  { label: "14D", val: 350 },
  { label: "1M", val: 334 },
  { label: "6M", val: 183 },
  { label: "1Y", val: 1 },
];

const TimeIntervalSelector = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleIntervalChange = (interval: number) => {
    dispatch(toggleInterval(interval));
  };

  const selectedInterval = useAppSelector((state) => state.interval.interval);

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

export default TimeIntervalSelector;

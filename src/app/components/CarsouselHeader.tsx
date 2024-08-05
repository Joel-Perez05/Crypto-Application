"use client";
import React from "react";
import { ChartBarIcon, XMarkIcon } from "@heroicons/react/20/solid";

type CarsouselHeaderPropsTypes = {
  isSelected: boolean;
};

const CarsouselHeader: React.FC<CarsouselHeaderPropsTypes> = (props) => {
  const { isSelected } = props;

  return (
    <div className="w-full h-12 flex justify-between ">
      <div className="w-255 h-full flex flex-col justify-end">
        <p className="w-full h-5 dark:text-[#D1D1D1] text-[#424286] text-sm ">
          Select the currency to view statistics
        </p>
      </div>
      {!isSelected ? (
        <button className="w-143 h-full text-sm dark:bg-[#232336] bg-white dark:text-white text-[#353570] rounded-md flex justify-center items-center">
          <ChartBarIcon className="w-6 h-6 mr-2" />
          Compare
        </button>
      ) : (
        <button className="w-192 h-full text-sm dark:bg-[#232336] bg-white dark:text-white text-[#353570] rounded-md flex justify-center items-center">
          <XMarkIcon className="w-6 h-6 mr-2" />
          Exit comparison
        </button>
      )}
    </div>
  );
};

export default CarsouselHeader;

"use client";
import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSelectedCurrency } from "@/redux/features/currency-Slice";

type MarketCapInfoPropsType = {
  title: string;
  data: string | undefined;
  symbol: string | undefined;
};

const MarketInfoDataTwo: React.FC<MarketCapInfoPropsType> = (props) => {
  const { title, data, symbol } = props;

  const selectedCurrency = useSelectedCurrency();

  return (
    <div className="flex justify-between items-center w-full mb-2">
      <div className="flex items-center justify-start w-1/2">
        <PlusIcon className="w-6 h-6 p-1 bg-[#403185] rounded-full shadow-sm shadow-white mr-3" />
        <h3 className="md:text-sm">{title}</h3>
      </div>
      <div className="w-1/2 flex justify-start ml-4">
        <h3 className="md:text-lg">
          {title !== "Volume/Market" ? selectedCurrency.symbol : null}
          {data}
          <span className="ml-2">{symbol}</span>
        </h3>
      </div>
    </div>
  );
};

export default MarketInfoDataTwo;

"use client";
import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSelectedCurrency } from "@/redux/features/currency-Slice";

type MarketInfoPropsType = {
  title: string;
  data: string | undefined;
};

const MarketInfoOne: React.FC<MarketInfoPropsType> = (props) => {
  const { title, data } = props;

  const selectedCurrency = useSelectedCurrency();

  return (
    <div className="flex mb-2">
      <PlusIcon className="w-5 h-5 p-1 bg-blue-500 rounded mr-3" />
      {title === "Volume / Market" ? (
        <h3 className="mr-3 text-sm">
          <span className="font-extrabold mr-1">{title}:</span>
          {data}...
        </h3>
      ) : (
        <h3 className="mr-3 text-sm">
          <span className="font-extrabold">{title}:</span>{" "}
          {selectedCurrency.symbol}
          {data}
        </h3>
      )}
    </div>
  );
};

export default MarketInfoOne;

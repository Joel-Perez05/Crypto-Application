"use client";
import React, { useEffect, useState } from "react";
import {
  convertToShorterNum,
  formatToNearestTenth,
  dateFormatter,
} from "../utils/formatFunctions";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";

type MyAssetInfoPropsType = {
  coinName: string;
  coinImg: string;
  coinSymbol: string;
  purchasePrice: number;
  priceWhenPurchased: number;
  currentPrice: number;
  purchaseDate: string;
};

const MyAssetInfo: React.FC<MyAssetInfoPropsType> = (props) => {
  const {
    coinName,
    coinImg,
    coinSymbol,
    currentPrice,
    priceWhenPurchased,
    purchasePrice,
    purchaseDate,
  } = props;

  const allCaps = coinSymbol.toUpperCase();
  const convertedPurchasePrice = convertToShorterNum(purchasePrice);

  const [pnlPercent, setpnlPercent] = useState<string>("");
  const [dateFormatted, setDateFormatted] = useState<string>("");

  useEffect(() => {
    const result = currentPrice / priceWhenPurchased;

    const formatted = formatToNearestTenth(result);
    setpnlPercent(formatted!);
    const formattedDate = dateFormatter(purchaseDate);
    setDateFormatted(formattedDate);
  }, []);

  return (
    <div className="flex flex-col justify-evenly h-full w-2/5 p-4 rounded-l-md bg-gradient-to-r from-[#212140] to-[#14142b]">
      <div className="flex items-center">
        <img className="w-10 h-10 mr-2" src={coinImg} alt="coin logo image" />
        <h2 className="text-white text-3xl">
          {coinName} ({allCaps})
        </h2>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-500 text-lg">Total Value</h3>
        <div className="flex items-end">
          <h3 className="text-white text-3xl mr-2">
            ${convertedPurchasePrice} USD
          </h3>
          <div className="flex items-center">
            {currentPrice > priceWhenPurchased ? (
              <ArrowTrendingUpIcon className="text-cyan-400 w-5 h-5 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="text-red-500 w-5 h-5 mr-1" />
            )}
            <h4
              className={`${
                currentPrice > priceWhenPurchased
                  ? "text-cyan-400"
                  : "text-red-500"
              } text-lg`}
            >
              {pnlPercent}%
            </h4>
          </div>
        </div>
      </div>
      <div className="flex text-gray-500">
        <h3 className="mr-2">Purchased</h3>
        <h3>{dateFormatted}</h3>
      </div>
    </div>
  );
};

export default MyAssetInfo;

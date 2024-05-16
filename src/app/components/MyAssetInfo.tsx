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
import { deleteAsset, getAssets } from "@/redux/features/assets-Slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { useSelectedCurrency } from "@/redux/features/currency-Slice";

type MyAssetInfoPropsType = {
  coinId: string;
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
    coinId,
    coinName,
    coinImg,
    coinSymbol,
    currentPrice,
    priceWhenPurchased,
    purchasePrice,
    purchaseDate,
  } = props;

  const selectedCurrency = useSelectedCurrency();

  const dispatch = useDispatch<AppDispatch>();

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

  const handleDelete = () => {
    dispatch(deleteAsset(coinId));
    dispatch(getAssets());
  };

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  const currencyAllCaps = selectedCurrency.currency.toUpperCase();

  return (
    <div
      className={`flex flex-col justify-evenly h-full w-380 p-4 rounded-l-md ${
        isDarkMode ? "bg-[#191932]" : "bg-white"
      } `}
    >
      <div className="flex items-center font-bold">
        <img className="w-8 h-8 mr-2" src={coinImg} alt="coin logo image" />
        <h2 className={`${isDarkMode ? "text-white" : "text-black"} text-2xl`}>
          {coinName} ({allCaps})
        </h2>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-500">Total Value</h3>
        <div className="flex items-end">
          <h3
            className={`${
              isDarkMode ? "text-white" : "text-black"
            } text-3xl font-bold mr-3`}
          >
            {selectedCurrency.symbol}
            {convertedPurchasePrice} {currencyAllCaps}
          </h3>
          <div className="flex items-center">
            {currentPrice >= priceWhenPurchased ? (
              <ArrowTrendingUpIcon className="text-[#01F1E3] w-5 h-5 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="text-red-500 w-5 h-5 mr-1" />
            )}
            <h4
              className={`${
                currentPrice >= priceWhenPurchased
                  ? "text-[#01F1E3]"
                  : "text-red-500"
              } text-md`}
            >
              {pnlPercent}%
            </h4>
          </div>
        </div>
      </div>
      <div className="flex text-gray-500 text-sm">
        <h3 className="mr-2">Purchased</h3>
        <h3>{dateFormatted}</h3>
      </div>
    </div>
  );
};

export default MyAssetInfo;

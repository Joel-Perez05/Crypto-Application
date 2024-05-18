"use client";
import { useEffect, useState } from "react";
import { CoinType, CurrencyNumberType } from "../utils/CoinPageTypes";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import numeral from "numeral";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useSelectedCurrency } from "@/redux/features/currency-Slice";
import { coinPageDateFormat } from "../utils/formatFunctions";
import { useAssets, getAssets } from "@/redux/features/assets-Slice";

type MarketDataPropsType = {
  market_data?: CoinType["market_data"];
  name?: string;
};

const CoinAtlAthInfo: React.FC<MarketDataPropsType> = (props) => {
  const { market_data, name } = props;

  const selectedCurrency = useSelectedCurrency();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAssets());
  }, []);

  const assets = useAssets();
  const matchedAsset = assets.find((asset) => asset.coinId === name);

  const calculateProfit = (
    purchasePrice: number | undefined,
    currentPrice: number | undefined,
    purchaseAmount: number | undefined
  ) => {
    if (purchasePrice && currentPrice && purchaseAmount !== undefined) {
      console.log(purchasePrice);
      console.log(currentPrice);
      console.log(purchaseAmount);

      const multiplier = currentPrice / purchasePrice;
      const profit = purchaseAmount * multiplier;
      return profit;
    }
  };
  console.log(matchedAsset);

  const profit = calculateProfit(
    matchedAsset?.priceWhenPurchased,
    market_data?.current_price[selectedCurrency.currency],
    matchedAsset?.purchasedAmount
  );

  const formatToNearestTenth = (num: number | undefined) => {
    if (num !== undefined) {
      return numeral(num).format("0.00");
    }
  };

  const roundToSixth = (num: number | undefined) => {
    if (num !== undefined) {
      const rounded = Math.round(num * 1e6) / 1e6;
      if (num >= 1000) {
        return numeral(rounded).format("0,0");
      }
      if (num < 1) {
        return numeral(rounded).format("0.000000");
      } else return rounded;
    }
  };

  const formattedPrice = roundToSixth(
    market_data?.current_price[selectedCurrency.currency]
  );

  const roundedPercentChange = formatToNearestTenth(
    market_data?.price_change_percentage_24h
  );

  const formattedAth = roundToSixth(
    market_data?.ath[selectedCurrency.currency]
  );
  const formattedAtl = roundToSixth(
    market_data?.atl[selectedCurrency.currency]
  );
  const formattedDateAth = coinPageDateFormat(
    market_data?.ath_date[selectedCurrency.currency]
  );
  const formattedDateAtl = coinPageDateFormat(
    market_data?.atl_date[selectedCurrency.currency]
  );

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={`${
        isDarkMode ? "text-white bg-[#1E1932]" : "text-black bg-white"
      } w-355 h-333 rounded-xl flex items-center justify-center`}
    >
      <div className="w-243 h72">
        <div className="h-69 w-full flex flex-col justify-between">
          <div className="w-full h-7 flex justify-between items-end">
            <h2 className="text-3xl font-bold">
              {selectedCurrency.symbol}
              {formattedPrice}
            </h2>
            <h3
              className={`${
                market_data?.price_change_percentage_24h !== undefined &&
                market_data?.price_change_percentage_24h < 0
                  ? "text-red-600"
                  : "text-[#01F1E3]"
              } flex items-center`}
            >
              {" "}
              <span className="mr-1">
                {market_data?.price_change_percentage_24h !== undefined &&
                market_data?.price_change_percentage_24h < 0 ? (
                  <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
                ) : (
                  <ArrowTrendingUpIcon className="w-4 h-4 text-[#01F1E3]" />
                )}
              </span>
              {roundedPercentChange}%
            </h3>
          </div>
          <h3 className="w-full h-6 text-lg">Profit: {profit}</h3>
        </div>
        <div className="flex justify-center mt-6">
          <Square3Stack3DIcon className="w-6 h-6" />
        </div>
        <div className="flex flex-col justify-between mt-6">
          <div className="h-11 w-full">
            <div className="flex items-end  justify-between">
              <div className="flex items-center">
                <span className="mr-3">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-[#01F1E3]" />
                </span>
                <h3>All time high:</h3>
              </div>
              <p className="text-xl">
                {selectedCurrency.symbol}
                {formattedAth}
              </p>
            </div>
            <p className="text-sm ml-8 mt-1">{formattedDateAth}</p>
          </div>
          <div className="h-11 w-full mt-2">
            <div className="flex items-end justify-between ">
              <div className="flex items-center">
                <span className="mr-3">
                  <ArrowTrendingDownIcon className="w-5 h-5 text-red-600" />
                </span>
                <h3>All time low:</h3>
              </div>
              <p className="text-2xl">
                {selectedCurrency.symbol}
                {formattedAtl}
              </p>
            </div>
            <p className="text-sm ml-8 mt-1">{formattedDateAtl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinAtlAthInfo;

"use client";
import { CoinType } from "../utils/CoinPageTypes";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import numeral from "numeral";
import format from "date-fns/format";
import { useAppSelector } from "@/redux/store";
import { useSelectedCurrency } from "@/redux/features/currency-Slice";

type MarketDataPropsType = {
  market_data?: CoinType["market_data"];
};

const CoinAtlAthInfo: React.FC<MarketDataPropsType> = (props) => {
  const { market_data } = props;

  const selectedCurrency = useSelectedCurrency();

  const formatToNearestTenth = (num: number | undefined) => {
    if (num !== undefined) {
      return numeral(num).format("0.00");
    }
  };

  const formatDate = (date: string | undefined) => {
    if (date !== undefined) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        return format(parsedDate, "MM-dd-yyyy");
      }
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
  const formattedDateAth = formatDate(
    market_data?.ath_date[selectedCurrency.currency]
  );
  const formattedDateAtl = formatDate(
    market_data?.atl_date[selectedCurrency.currency]
  );

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={`${
        isDarkMode ? "text-white bg-[#1f1833]" : "text-black bg-white"
      }  md:w-80 max-sm:w-full max-sm:mb-4 h-full pt-8 pb-8 rounded-xl flex items-center justify-evenly flex-col`}
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex md:justify-evenly items-end mb-4 w-full">
          <h2 className="text-4xl">
            {selectedCurrency.symbol}
            {formattedPrice}
          </h2>
          <h3
            className={`${
              market_data?.price_change_percentage_24h !== undefined &&
              market_data?.price_change_percentage_24h < 0
                ? "text-red-600"
                : "text-cyan-500"
            } flex items-center text-lg`}
          >
            {" "}
            <span className="mr-1">
              {market_data?.price_change_percentage_24h !== undefined &&
              market_data?.price_change_percentage_24h < 0 ? (
                <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
              ) : (
                <ArrowTrendingUpIcon className="w-4 h-4 text-cyan-500" />
              )}
            </span>
            {roundedPercentChange}%
          </h3>
        </div>
        <Square3Stack3DIcon className="w-8 h-8 mb-4" />
      </div>
      <div className="flex justify-between items-center flex-col w-full">
        <div className="md:w-4/5">
          <div className="flex items-end justify-start">
            <div className="flex items-center">
              <span className="mr-1">
                <ArrowTrendingUpIcon className="w-6 h-6 text-cyan-500" />
              </span>
              <h3 className="">All time high:</h3>
            </div>
            <p className="ml-6 text-2xl mt-1 pt-2">
              {selectedCurrency.symbol}
              {formattedAth}
            </p>
          </div>
          <p className="ml-6 mt-1">{formattedDateAth}</p>
        </div>
        <div className="mt-2 md:w-4/5">
          <div className="flex items-end justify-start">
            <div className="flex items-center">
              <span className="mr-1">
                <ArrowTrendingDownIcon className="w-6 h-6 text-red-600" />
              </span>
              <h3 className="">All time low:</h3>
            </div>
            <p className="ml-8 text-2xl mt-1 pt-2">
              {selectedCurrency.symbol}
              {formattedAtl}
            </p>
          </div>
          <p className="ml-6 mt-1">{formattedDateAtl}</p>
        </div>
      </div>
    </div>
  );
};

export default CoinAtlAthInfo;

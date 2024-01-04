"use client";
import { CoinType } from "../coin/[id]/page";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import numeral from "numeral";
import format from "date-fns/format";

type MarketDataPropsType = {
  market_data?: CoinType["market_data"];
};

const CoinAtlAthInfo: React.FC<MarketDataPropsType> = (props) => {
  const { market_data } = props;

  const formatToNearestTenth = (num: number | undefined) => {
    if (num !== undefined) {
      const roundedPercent = Math.ceil(num * 10) / 10;
      return numeral(roundedPercent).format("0.0");
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

  const formattedPrice = roundToSixth(market_data?.current_price.usd);

  const roundedPercentChange = formatToNearestTenth(
    market_data?.price_change_percentage_24h
  );

  const formattedAth = roundToSixth(market_data?.ath.usd);
  const formattedAtl = roundToSixth(market_data?.atl.usd);
  const formattedPercentAth = formatToNearestTenth(
    market_data?.ath_change_percentage.usd
  );
  const formattedPercentAtl = formatToNearestTenth(
    market_data?.atl_change_percentage.usd
  );
  const formattedDateAth = formatDate(market_data?.ath_date.usd);
  const formattedDateAtl = formatDate(market_data?.atl_date.usd);

  return (
    <div className="text-white bg-custom-dark2 w-80 h-64 rounded-2xl flex items-center justify-evenly flex-col p-3">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-1">${formattedPrice}</h2>
        <h3
          className={`${
            market_data?.price_change_percentage_24h ?? 0 < 0
              ? "text-red-600"
              : "text-green-600"
          } flex items-center text-xl mb-1`}
        >
          {" "}
          <span className="mr-1">
            {market_data?.price_change_percentage_24h ?? 0 < 0 ? (
              <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
            ) : (
              <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
            )}
          </span>
          {roundedPercentChange}%
        </h3>
        <Square3Stack3DIcon className="w-12 h-12" />
      </div>
      <div className="flex justify-around w-full">
        <div>
          <h3 className="mb-2">ATH:</h3>
          <p>${formattedAth}</p>
          <p>{formattedPercentAth}%</p>
          <p>{formattedDateAth}</p>
        </div>
        <div>
          <h3 className="mb-2">ATL:</h3>
          <p>${formattedAtl}</p>
          <p>{formattedPercentAtl}%</p>
          <p>{formattedDateAtl}</p>
        </div>
      </div>
    </div>
  );
};

export default CoinAtlAthInfo;

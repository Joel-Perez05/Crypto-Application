"use client";
import React, { useState } from "react";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { selectCoinNames } from "@/redux/features/graphs-slice";
import CarsouselHeader from "./CarsouselHeader";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  roundToSixth,
  formatToNearestHundreth,
} from "../utils/formatFunctions";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";

const CoinCarousel = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [coinNameArr, setCoinNameArr] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const coins = useAppSelector((state) => state.sort.sortedCoins);
  const currentCurrency = useAppSelector((state) => state.currency.currency);

  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <CustomeNextArrow />,
    prevArrow: <CustomePrevArrow />,
  };

  const handleCoinSelect = (name1: string, name2: string) => {
    dispatch(
      selectCoinNames({
        coinA: {
          name: name1,
        },
        coinB: {
          name: name2,
        },
      })
    );
  };

  const handleCoinClick = (coinId: string) => {
    setCoinNameArr((prevstate) => {
      let updatedCoins;
      if (prevstate.includes(coinId)) {
        updatedCoins = prevstate.filter((id) => id !== coinId);
      } else {
        updatedCoins = [...prevstate, coinId];
      }

      setIsSelected(updatedCoins.length > 0);

      if (updatedCoins.length === 2) {
        handleCoinSelect(updatedCoins[0], updatedCoins[1]);
      }
      return updatedCoins.slice(-2);
    });
  };

  return (
    <div className="w-full h-152 text-white flex flex-col justify-between relative">
      <CarsouselHeader isSelected={isSelected} />
      <div className="slider-container w-full h-20">
        <Slider {...settings}>
          {coins.map((coin) => {
            const allCaps = coin.symbol.toUpperCase();
            const coinPrice = roundToSixth(coin.current_price);
            const oneHourPriceChange = formatToNearestHundreth(
              coin.price_change_percentage_1h_in_currency
            );
            const isCoinSelected = coinNameArr.includes(coin.id);
            return (
              <div className="w-full h-78" key={coin.id}>
                <div
                  onClick={() => handleCoinClick(coin.id)}
                  className={`${
                    isCoinSelected
                      ? "bg-[#6161d68a]"
                      : "dark:bg-[#191925] bg-white"
                  } flex items-center justify-evenly w-252.8 h-full rounded-md cursor-pointer dark:text-white text-[#181825]`}
                >
                  <div>
                    <img
                      className="h-8 w-8"
                      src={coin.image}
                      alt="coin logo image"
                    />
                  </div>
                  <div className="w-192 h-46 flex flex-col justify-between">
                    <p className="dark:text-white text-[#181825] text-sm font-medium">
                      {coin.name} ({allCaps})
                    </p>
                    <div className="flex items-center">
                      <p className="dark:text-[#D1D1D1] text-[#424286] text-sm">
                        {coinPrice} {currentCurrency.toLocaleUpperCase()}
                      </p>
                      {coin.price_change_percentage_1h_in_currency !==
                        undefined &&
                      coin.price_change_percentage_1h_in_currency > 0 ? (
                        <ArrowTrendingUpIcon className="w-4 h-4 ml-2 mr-1 dark:text-[#01F1E3] text-[#00B1A7]" />
                      ) : (
                        <ArrowTrendingDownIcon className="w-4 h-4 ml-2 mr-1 text-[#FE2264]" />
                      )}
                      <p
                        className={`${
                          coin.price_change_percentage_1h_in_currency !==
                            undefined &&
                          coin.price_change_percentage_1h_in_currency > 0
                            ? "dark:text-[#01F1E3] text-[#00B1A7]"
                            : "text-[#FE2264]"
                        } text-sm`}
                      >
                        {oneHourPriceChange}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

const CustomeNextArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;

  return (
    <div
      onClick={onClick}
      className="absolute z-50 bottom-[19px] left-full cursor-pointer w-10 h-10 rounded-full bg-[#6161d683] flex justify-center items-center"
    >
      <ChevronRightIcon className="w-6 h-6 text-white" />
    </div>
  );
};

const CustomePrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;

  return (
    <div
      onClick={onClick}
      className="absolute z-50 top-[19px] right-full mr-1 cursor-pointer w-10 h-10 rounded-full bg-[#6161d683] flex justify-center items-center"
    >
      <ChevronLeftIcon className="w-6 h-6 text-white" />
    </div>
  );
};

export default CoinCarousel;

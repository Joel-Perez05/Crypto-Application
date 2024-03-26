"use client";
import React from "react";
import { useAppSelector } from "@/redux/store";

type SelectedCoinPropsType = {
  selectedCoin: {
    coin: string;
    img: string;
    symbol: string;
  };
};

const CoinSelectPreview: React.FC<SelectedCoinPropsType> = (props) => {
  const { selectedCoin } = props;
  const allCaps = selectedCoin.symbol.toUpperCase();

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return selectedCoin.coin ? (
    <div
      className={`${
        isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
      } flex flex-col justify-center items-center w-1/4 h-56 rounded-md`}
    >
      <div className="w-20 h-20">
        <img className="rounded-md" src={selectedCoin.img} alt="coin photo" />
      </div>
      <h2 className=" mt-2 text-sm">
        {selectedCoin.coin} ({allCaps})
      </h2>
    </div>
  ) : (
    <div
      className={`${
        isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
      } flex flex-col justify-center items-center w-1/4 h-56 rounded-md `}
    >
      <h2>Select Coin</h2>
    </div>
  );
};

export default CoinSelectPreview;

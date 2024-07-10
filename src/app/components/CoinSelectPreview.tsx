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
      className={`dark:bg-[#191932] bg-[#6161d688] text-white flex flex-col justify-center items-center w-297 h-full rounded-md`}
    >
      <div className="flex justify-center items-center w-16 h-16 rounded-md dark:bg-[#2C2C4A] bg-[#ccccfa3d]">
        <img className="w-8 h-8" src={selectedCoin.img} alt="coin photo" />
      </div>
      <h2 className=" mt-6 text-2xl font-semibold">
        {selectedCoin.coin} ({allCaps})
      </h2>
    </div>
  ) : (
    <div
      className={`dark:bg-[#191932] bg-[#6161d688] text-white flex flex-col justify-center items-center w-297 h-full text-xl rounded-md `}
    >
      <h2>Select Coin</h2>
    </div>
  );
};

export default CoinSelectPreview;

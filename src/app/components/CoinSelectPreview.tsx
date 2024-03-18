"use client";
import React from "react";

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

  return selectedCoin.coin ? (
    <div className="flex flex-col justify-center items-center w-1/4 h-56 rounded-md bg-custom-dark2">
      <div className="w-20 h-20">
        <img className="rounded-md" src={selectedCoin.img} alt="coin photo" />
      </div>
      <h2 className="text-white mt-2 text-sm">
        {selectedCoin.coin} ({allCaps})
      </h2>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center w-1/4 h-56 rounded-md bg-custom-dark2">
      <h2 className="text-white">Select Coin</h2>
    </div>
  );
};

export default CoinSelectPreview;

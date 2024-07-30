"use client";
import React from "react";
import { Coin } from "../utils/CoinPageTypes";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCoinB, updateCoinBQty } from "@/redux/features/conversion-Slice";

type CoinPropTypes = {
  coins: Coin[];
};

const ConvertorCoinTwo: React.FC<CoinPropTypes> = (props) => {
  const { coins } = props;

  const selectedCoinB = useAppSelector((state) => state.convert.coinB);

  const dispatch = useDispatch<AppDispatch>();

  const handleCoinSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCoinId = e.target.value;
    const selectedCoin = coins.find((coin) => coin.id === selectedCoinId);
    if (selectedCoin) {
      const allcaps = selectedCoin.symbol.toUpperCase();
      dispatch(
        updateCoinB({
          name: selectedCoin.name,
          price: selectedCoin.current_price,
          qty: 0,
          symbol: allcaps,
          prices: selectedCoin.sparkline_in_7d.price,
        })
      );
    }
  };

  return (
    <div className="w-full h-6 flex justify-between">
      <div className="h-full w-179 dark:bg-[#1E1932] bg-white">
        <select
          className="focus:outline-none dark:bg-[#1E1932] bg-white dark:text-white text-[#353570]"
          name="coinB"
          id="coinB"
          onChange={handleCoinSelect}
        >
          <option className="dark:bg-[#1E1932] bg-white" value="">
            Please Select Coin
          </option>
          {coins.map((coin) => {
            const allcaps = coin.symbol.toLocaleUpperCase();
            return (
              <option
                className="w-full dark:bg-[#1E1932] bg-white"
                key={coin.id}
                value={coin.id}
              >
                {coin.name} {allcaps}
              </option>
            );
          })}
        </select>
      </div>
      <p className="focus:outline-none h-full w-40 text-end pr-2 dark:text-white text-[#353570] bg-transparent">
        {selectedCoinB.qty}
      </p>
    </div>
  );
};

export default ConvertorCoinTwo;

"use client";
import React from "react";
import { Coin } from "../utils/CoinPageTypes";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateCoinA, updateCoinAQty } from "@/redux/features/conversion-Slice";

type CoinPropTypes = {
  coins: Coin[];
};

const ConvertorCoinOne: React.FC<CoinPropTypes> = (props) => {
  const { coins } = props;

  const selectedCoinA = useAppSelector((state) => state.convert.coinA);

  const dispatch = useDispatch<AppDispatch>();

  const handleCoinSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCoinId = e.target.value;
    const selectedCoin = coins.find((coin) => coin.id === selectedCoinId);
    if (selectedCoin) {
      const allcaps = selectedCoin.symbol.toUpperCase();
      dispatch(
        updateCoinA({
          name: selectedCoin.name,
          price: selectedCoin.current_price,
          qty: 1,
          symbol: allcaps,
          prices: selectedCoin.sparkline_in_7d.price,
        })
      );
    }
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedQty = parseFloat(e.target.value);
    if (!isNaN(selectedQty)) {
      dispatch(updateCoinAQty(selectedQty));
    }
  };

  return (
    <div className="w-full h-6 flex justify-between">
      <div className="h-full w-179 dark:bg-[#191932] bg-white">
        <select
          className="focus:outline-none dark:bg-[#191932] bg-white dark:text-white text-[#353570]"
          name="coinA"
          id="coinA"
          onChange={handleCoinSelect}
        >
          <option className="dark:bg-[#191932] bg-white" value="">
            Please Select Coin
          </option>
          {coins.map((coin) => {
            const allcaps = coin.symbol.toLocaleUpperCase();
            return (
              <option
                className="w-full dark:bg-[#191932] bg-white"
                key={coin.id}
                value={coin.id}
              >
                {coin.name} {allcaps}
              </option>
            );
          })}
        </select>
      </div>
      <input
        className="focus:outline-none h-full w-16 pl-2 dark:text-white text-[#353570] bg-transparent"
        type="number"
        value={selectedCoinA.qty}
        onChange={handleQtyChange}
      />
    </div>
  );
};

export default ConvertorCoinOne;

"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { CoinType } from "../coin/[id]/page";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import numeral from "numeral";
import { current } from "@reduxjs/toolkit";

type CoinConvertorPropsType = {
  symbol: CoinType["symbol"];
  market_data?: CoinType["market_data"];
};

const CoinConvertor: React.FC<CoinConvertorPropsType> = (props) => {
  const { market_data, symbol } = props;
  const [currencyAmount, setCurrencyAmount] = useState<string>("");
  const [coinAmount, setCoinAmount] = useState<string>("");
  const [initialPlaceholder, setInitialPlaceholder] = useState<string>(
    numeral(1 / (market_data?.current_price.usd || 1)).format("0.000000")
  );

  useEffect(() => {
    const fetchInitialPlaceholder = async () => {
      const price = market_data?.current_price.usd;
      if (price !== undefined) {
        setInitialPlaceholder(numeral(1 / price).format("0.000000"));
      }
    };

    fetchInitialPlaceholder();
  }, [market_data]);

  const allCaps = symbol?.toUpperCase();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputType: "currency" | "coin"
  ) => {
    let numericalVal = e.target.value.replace(/[^0-9.]/g, "");

    const parts = numericalVal.split(".");
    if (parts.length > 2) {
      numericalVal = `${parts[0]}.${parts.slice(1).join("")}`;
    }

    let coinPrice = market_data?.current_price.usd;
    if (coinPrice !== undefined) {
      const multiplierStr = numeral(1 / coinPrice).format("0.000000");
      coinPrice = parseFloat(multiplierStr);
    }

    const numericalValue = parseFloat(numericalVal);
    const multiplier = coinPrice ?? 0;

    if (inputType === "currency" && multiplier !== undefined) {
      const result = multiplier * numericalValue;
      conversionFunction(result, numericalVal, multiplier, inputType);
    } else if (
      inputType === "coin" &&
      market_data?.current_price.usd !== undefined
    ) {
      const result = numericalValue * market_data.current_price.usd;
      conversionFunction(result, numericalVal, multiplier, inputType);
    }
  };

  const conversionFunction = (
    result: number,
    numericalVal: string,
    multiplier: number,
    inputType: string
  ) => {
    if (inputType === "currency") {
      if (result > 1) {
        const resultFormatted = numeral(result).format("00,000.00");
        setCoinAmount(resultFormatted);
      } else if (!numericalVal) {
        setCoinAmount(multiplier.toString());
      } else {
        const resultFormatted = numeral(result).format("0.000000");
        setCoinAmount(resultFormatted);
      }
      setCurrencyAmount(numericalVal);
    } else if (inputType === "coin") {
      if (result > 1) {
        const resultFormatted = numeral(result).format("00,000.00");
        setCurrencyAmount(resultFormatted);
      } else if (!numericalVal) {
        const defaultVal = 1;
        setCurrencyAmount(defaultVal.toString());
      } else {
        const resultFormatted = numeral(result).format("0.000000");
        setCurrencyAmount(resultFormatted);
      }
      setCoinAmount(numericalVal);
    }
  };

  return (
    <div className="w-full flex justify-evenly mt-6">
      <div className="w-96 h-14 flex">
        <span className="text-white bg-green-500 w-28 flex justify-center items-center rounded-l-lg">
          <label htmlFor="currency">USD</label>
        </span>
        <input
          className="bg-custom-dark2 w-full text-white rounded-r-lg appearance-none focus:outline-none p-4"
          id="currency"
          type="text"
          placeholder="1"
          value={currencyAmount}
          onChange={(e) => handleInputChange(e, "currency")}
        />
      </div>
      <button>
        <ArrowsRightLeftIcon className="h-10 w-10 text-white" />
      </button>
      <div className="w-96 h-14 flex">
        <span className="text-white bg-green-500 w-28 flex justify-center items-center rounded-l-lg">
          <label htmlFor="coin">{allCaps}</label>
        </span>
        <input
          className="bg-custom-dark2 w-full text-white rounded-r-lg appearance-none focus:outline-none p-4"
          id="coin"
          type="text"
          placeholder={initialPlaceholder}
          value={coinAmount}
          onChange={(e) => handleInputChange(e, "coin")}
        />
      </div>
    </div>
  );
};

export default CoinConvertor;

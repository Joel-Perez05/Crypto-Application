"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { CoinType } from "../utils/CoinPageTypes";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import numeral from "numeral";
import { useAppSelector } from "@/redux/store";
import { useSelectedCurrency } from "@/redux/features/currency-Slice";

type CoinConvertorPropsType = {
  symbol: CoinType["symbol"];
  market_data?: CoinType["market_data"];
};

const CoinConvertor: React.FC<CoinConvertorPropsType> = (props) => {
  const selectedCurrency = useSelectedCurrency();

  const { market_data, symbol } = props;
  const [currencyAmount, setCurrencyAmount] = useState<string>("");
  const [coinAmount, setCoinAmount] = useState<string>("");
  const [initialPlaceholder, setInitialPlaceholder] = useState<string>(
    numeral(
      1 / (market_data?.current_price[selectedCurrency.currency] || 1)
    ).format("0.000000")
  );

  useEffect(() => {
    const fetchInitialPlaceholder = async () => {
      const price = market_data?.current_price[selectedCurrency.currency];
      if (price !== undefined) {
        setInitialPlaceholder(numeral(1 / price).format("0.000000"));
      }
    };

    fetchInitialPlaceholder();
  }, [market_data, selectedCurrency]);

  const allCaps = symbol?.toUpperCase();
  const currencySymbolAllCaps = selectedCurrency.symbol.toUpperCase();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputType: "currency" | "coin"
  ) => {
    let numericalVal = e.target.value.replace(/[^0-9.]/g, "");

    const parts = numericalVal.split(".");
    if (parts.length > 2) {
      numericalVal = `${parts[0]}.${parts.slice(1).join("")}`;
    }

    let coinPrice = market_data?.current_price[selectedCurrency.currency];
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
      market_data?.current_price[selectedCurrency.currency] !== undefined
    ) {
      const result =
        numericalValue * market_data.current_price[selectedCurrency.currency];
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

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div className="w-full flex justify-between mt-6 max-sm:mb-6">
      <div className="md:w-64 h-14 flex">
        <span className="text-white bg-cyan-500 w-28 flex justify-center items-center rounded-l-lg">
          <label htmlFor="currency">{currencySymbolAllCaps}</label>
        </span>
        <input
          className={`${
            isDarkMode ? "bg-[#1f1833] text-white" : "bg-white text-black"
          } w-full rounded-r-lg appearance-none focus:outline-none p-4`}
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
      <div className="md:w-64 h-14 flex">
        <span className="text-white bg-cyan-500 w-28 flex justify-center items-center rounded-l-lg">
          <label htmlFor="coin">{allCaps}</label>
        </span>
        <input
          className={`${
            isDarkMode ? "bg-[#1f1833] text-white" : "bg-white text-black"
          } w-full rounded-r-lg appearance-none focus:outline-none p-4`}
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

"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { currencies } from "../utils/currencyData";
import { CurrencySelect } from "../utils/CoinPageTypes";
import {
  useSelectedCurrency,
  currencyToggler,
  InitialCurrencyStateType,
} from "@/redux/features/currency-Slice";
import { useDispatch } from "react-redux";

const CurrencySelector: React.FC = () => {
  const [selectedCurr, setSelectedCurr] = useState<InitialCurrencyStateType>();

  const options: CurrencySelect[] = currencies;

  const allCapsCurrency = selectedCurr?.currency.toUpperCase();

  const currSymbol = selectedCurr?.symbol;

  const dispatch = useDispatch<AppDispatch>();
  const selectedCurrency = useSelectedCurrency();

  useEffect(() => {
    setSelectedCurr(selectedCurrency);
  }, [selectedCurrency]);

  const isDarkMode: boolean = useAppSelector(
    (state) => state.themeReducer.isDarkMode
  );

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    const [currencyValue, currencySymbol] = selectedCurrency.split(":");
    dispatch(
      currencyToggler({
        currency: currencyValue,
        symbol: currencySymbol,
      })
    );
  };
  return (
    <div className="rounded-md flex h-48 w-108">
      <select
        className={`${
          isDarkMode ? "bg-[#191925] text-white" : "bg-white text-black"
        } h-full w-full pl-4 rounded-md border border-[#212140]`}
        id="currency"
        name="currency"
        value={selectedCurr?.currency}
        onChange={(e) => handleCurrencyChange(e)}
      >
        <option value="">
          <span className="mr-2">{currSymbol}</span>
          {allCapsCurrency}
        </option>
        {options.map((currency) => {
          const valueString = `${currency.value}:${currency.symbol}`;
          return (
            <option key={currency.label} value={valueString}>
              {currency.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrencySelector;

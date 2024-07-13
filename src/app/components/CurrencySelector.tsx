"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { currencies } from "../utils/currencyData";
import { CurrencySelect } from "../utils/CoinPageTypes";
import {
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

  const selectedCurrency = useAppSelector((state) => state.currency);

  useEffect(() => {
    setSelectedCurr(selectedCurrency);
  }, [selectedCurrency]);

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
        className={`dark:bg-[#191925] dark:text-white bg-[#ccccfa63] text-[#424286] h-full w-full pl-4 rounded-md border broder-white dark:border-[#212140]`}
        id="currency"
        name="currency"
        value={selectedCurr?.currency}
        onChange={(e) => handleCurrencyChange(e)}
      >
        <option value="">
          {currSymbol}
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

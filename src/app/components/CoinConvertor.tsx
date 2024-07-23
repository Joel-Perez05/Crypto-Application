"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import ConvertorCoinOne from "./ConvertorCoinOne";
import ConvertorCoinTwo from "./ConvertorCoinTwo";

const CoinConvertor = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const formattedDateTime = new Intl.DateTimeFormat(
        "en-US",
        options
      ).format(now);
      setDateTime(formattedDateTime);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const coins = useAppSelector((state) => state.sort.sortedCoins);
  const selectedCoinA = useAppSelector((state) => state.convert.coinA);
  const selectedCoinB = useAppSelector((state) => state.convert.coinB);
  const selectedCurrency = useAppSelector((state) => state.currency.symbol);

  return (
    <div className="w-full h-277 flex flex-col justify-between">
      <div className="flex flex-col justify-between w-253 h-53">
        <p className="dark:text-white text-[#424286] text-xl">
          Online currency convertor
        </p>
        <p className="dark:text-[#9E9E9E] text-[#424286c9]">{dateTime}</p>
      </div>
      <div className="w-full h-200 flex justify-between items-center relative">
        <div className="flex flex-col justify-between items-center p-6 w-636 h-full dark:bg-[#191932] bg-white rounded-2xl">
          <div className="w-588">
            <p className="dark:text-[#ffffffbb] text-[#181825] text-sm">
              You sell
            </p>
          </div>
          <div className="h-88 w-588 flex flex-col justify-between">
            <ConvertorCoinOne coins={coins} />
            <div className="w-full h-10 border-t border-white flex items-center pl-2">
              {selectedCoinA.name === "" ? (
                <p></p>
              ) : (
                <p className="h-6 w-40 dark:text-[#ffffffbb] text-[#181825] text-sm">
                  1 {selectedCoinA.symbol} = {selectedCurrency}
                  {selectedCoinA.price}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 z-50fr w-12 h-12 dark:bg-white bg-[#353570] rounded-full">
          <button className="flex justify-center items-center w-full h-full">
            <ArrowPathRoundedSquareIcon className="dark:text-[#3D3D7E] text-white w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col justify-between items-center p-6 w-636 h-full dark:bg-[#1E1932] bg-white rounded-2xl">
          <div className="w-588">
            <p className="dark:text-[#ffffffbb] text-[#181825] text-sm">
              You Buy
            </p>
          </div>
          <div className="h-88 w-588 flex flex-col justify-between">
            <ConvertorCoinTwo coins={coins} />
            <div className="w-full h-10 border-t border-white flex items-center pl-2">
              {selectedCoinB.name === "" ? (
                <p></p>
              ) : (
                <p className="h-6 w-40 dark:text-[#ffffffbb] text-[#181825] text-sm">
                  1 {selectedCoinB.symbol} = {selectedCurrency}
                  {selectedCoinB.price}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinConvertor;

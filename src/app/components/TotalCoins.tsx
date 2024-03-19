"use client";
import React from "react";
import { BanknotesIcon } from "@heroicons/react/20/solid";

type TotalCoinsPropsType = {
  totalCoins: number | undefined;
};

const TotalCoins: React.FC<TotalCoinsPropsType> = (props) => {
  const { totalCoins } = props;

  return (
    <div className="flex items-center text-white">
      <BanknotesIcon className="w-5 h-5 mr-2" />
      <h2>Coins: {totalCoins}</h2>
    </div>
  );
};

export default TotalCoins;

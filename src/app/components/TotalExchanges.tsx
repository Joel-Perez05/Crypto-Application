"use client";
import React from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

type TotalExchangesPropsType = {
  totalExchanges: number | undefined;
};

const TotalExchanges: React.FC<TotalExchangesPropsType> = (props) => {
  const { totalExchanges } = props;

  return (
    <div className="flex items-center">
      <ArrowPathIcon className="w-5 h-5 mr-2" />
      <h2>Exchange: {totalExchanges}</h2>
    </div>
  );
};

export default TotalExchanges;

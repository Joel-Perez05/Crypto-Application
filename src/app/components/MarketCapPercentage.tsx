"use client";
import React from "react";
import { formatToNearestWhole } from "../utils/formatFunctions";
import ProgressBar from "@ramonak/react-progress-bar";

type MarketCapPercentagePropsType = {
  image: string;
  marketCap: number | undefined;
  color: string;
};

const MarketCapPercentage: React.FC<MarketCapPercentagePropsType> = (props) => {
  const { image, marketCap, color } = props;

  const formattedPercent = formatToNearestWhole(marketCap);
  const backToNum = Number(formattedPercent);

  return (
    <div className="flex items-center">
      <img className="w-6 h-6 mr-2" src={image} alt="photo of coin" />
      <h2 className=" text-white mr-2">{formattedPercent}%</h2>
      <ProgressBar
        completed={backToNum}
        maxCompleted={100}
        bgColor={color}
        baseBgColor="#6b7280"
        height="8px"
        width="70px"
        isLabelVisible={false}
        className=""
      />
    </div>
  );
};

export default MarketCapPercentage;

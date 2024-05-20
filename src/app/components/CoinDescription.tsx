"use client";
import React from "react";
import { CoinType } from "../utils/CoinPageTypes";
import ReactHtmlParser from "react-html-parser";
import { useAppSelector } from "@/redux/store";

type CoinDescriptionPropTypes = {
  description: CoinType["description"];
};

const CoinDescription: React.FC<CoinDescriptionPropTypes> = (props) => {
  const { description } = props;

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={`w-692 h-full ${
        isDarkMode ? " text-white" : " text-black"
      } rounded-xl text-sm `}
    >
      <p className="w-full text-sm">
        {ReactHtmlParser(description?.en as string)}
      </p>
    </div>
  );
};

export default CoinDescription;

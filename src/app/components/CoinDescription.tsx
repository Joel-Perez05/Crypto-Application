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
    <div className="mb-2">
      <div
        className={`w-full ${
          isDarkMode ? " text-white" : " text-black"
        } rounded-xl mt-6 prose text-sm mb-10`}
      >
        <h2 className="text-2xl mb-4 mt-10">Description</h2>
        <div>{ReactHtmlParser(description?.en as string)}</div>
      </div>
    </div>
  );
};

export default CoinDescription;

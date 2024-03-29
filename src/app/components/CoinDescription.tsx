"use client";
import React from "react";
import { CoinType } from "../utils/CoinPageTypes";
import { LinkIcon } from "@heroicons/react/20/solid";
import ReactHtmlParser from "react-html-parser";
import { useAppSelector } from "@/redux/store";

type CoinDescriptionPropTypes = {
  description: CoinType["description"];
  links: CoinType["links"];
};

const CoinDescription: React.FC<CoinDescriptionPropTypes> = (props) => {
  const { description, links } = props;

  const linkOne = links?.blockchain_site[0];
  const linkTwo = links?.blockchain_site[1];
  const linkThree = links?.blockchain_site[2];

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div className="mb-2">
      <div
        className={`w-full ${
          isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
        } rounded-xl p-4 mt-6 prose text-sm mb-10`}
      >
        <div>{ReactHtmlParser(description?.en as string)}</div>
      </div>
      <div className="flex justify-between mb-4">
        <div
          className={`${
            isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
          } w-5/12 h-12 flex justify-center items-center rounded-xl`}
        >
          <LinkIcon className="w-5 h-5 mr-1" />
          <a href={linkOne} target="_blank">
            {linkOne}
          </a>
        </div>
        <div
          className={`${
            isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
          } w-5/12 h-12 flex justify-center items-center rounded-xl`}
        >
          <LinkIcon className="w-5 h-5 mr-1" />
          <a href={linkTwo} target="_blank">
            {linkTwo}
          </a>
        </div>
      </div>
      <div
        className={`${
          isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
        } w-full h-12 flex justify-center items-center rounded-xl`}
      >
        <LinkIcon className="w-5 h-5 mr-1" />
        <a href={linkThree} target="_blank">
          {linkThree}
        </a>
      </div>
    </div>
  );
};

export default CoinDescription;

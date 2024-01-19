"use client";
import React from "react";
import { CoinType } from "../utils/CoinPageTypes";
import { LinkIcon } from "@heroicons/react/20/solid";
import ReactHtmlParser from "react-html-parser";

type CoinDescriptionPropTypes = {
  description: CoinType["description"];
  links: CoinType["links"];
};

const CoinDescription: React.FC<CoinDescriptionPropTypes> = (props) => {
  const { description, links } = props;

  const linkOne = links?.blockchain_site[0];
  const linkTwo = links?.blockchain_site[1];
  const linkThree = links?.blockchain_site[2];

  return (
    <div className="mb-2">
      <div className="w-full bg-custom-dark2 rounded-xl p-4 mt-6 prose text-white text-sm mb-10">
        <div>{ReactHtmlParser(description?.en as string)}</div>
      </div>
      <div className="flex justify-between mb-4 text-white">
        <div className="bg-custom-dark2 w-5/12 h-12 flex justify-center items-center rounded-xl">
          <LinkIcon className="w-5 h-5 mr-1" />
          <a href={linkOne} target="_blank">
            {linkOne}
          </a>
        </div>
        <div className="bg-custom-dark2 w-5/12 h-12 flex justify-center items-center rounded-xl">
          <LinkIcon className="w-5 h-5 mr-1" />
          <a href={linkTwo} target="_blank">
            {linkTwo}
          </a>
        </div>
      </div>
      <div className="bg-custom-dark2 w-full h-12 text-white flex justify-center items-center rounded-xl">
        <LinkIcon className="w-5 h-5 mr-1" />
        <a href={linkThree} target="_blank">
          {linkThree}
        </a>
      </div>
    </div>
  );
};

export default CoinDescription;

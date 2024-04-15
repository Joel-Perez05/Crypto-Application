import React from "react";
import { CoinType } from "../utils/CoinPageTypes";
import { useAppSelector } from "@/redux/store";
import { LinkIcon } from "@heroicons/react/20/solid";

type CoinLinkPropsType = {
  links: CoinType["links"];
};

const CoinLinks: React.FC<CoinLinkPropsType> = (props) => {
  const { links } = props;

  const linkOne = links?.blockchain_site[0];
  const linkTwo = links?.blockchain_site[1];
  const linkThree = links?.blockchain_site[2];

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div>
      <div className="flex justify-between max-sm:flex-col mb-4">
        <div
          className={`${
            isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
          } md:w-5/12 max-sm:w-full max-sm:mb-4 h-12 flex justify-center items-center rounded-xl`}
        >
          <LinkIcon className="w-5 h-5 mr-1" />
          <a href={linkOne} target="_blank">
            {linkOne}
          </a>
        </div>
        <div
          className={`${
            isDarkMode ? "bg-custom-dark2 text-white" : "bg-gray-300 text-black"
          } md:w-5/12 max-sm:w-full h-12 flex justify-center items-center rounded-xl`}
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

export default CoinLinks;

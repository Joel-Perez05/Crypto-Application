import React from "react";
import { CoinType } from "../utils/CoinPageTypes";
import { useAppSelector } from "@/redux/store";
import { LinkIcon } from "@heroicons/react/20/solid";
import { Square2StackIcon } from "@heroicons/react/24/outline";

type CoinLinkPropsType = {
  links: CoinType["links"];
};

const CoinLinks: React.FC<CoinLinkPropsType> = (props) => {
  const { links } = props;

  const linkOne = links?.blockchain_site[0];
  const linkTwo = links?.blockchain_site[1];
  const linkThree = links?.blockchain_site[2];

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  const copyToClipboard = async (url: string | undefined) => {
    try {
      if (url !== undefined) {
        await navigator.clipboard.writeText(url);
        alert("Copied to Clipboard!");
      }
    } catch (error) {
      console.error("Unable to copy to clipboard:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center">
        <div
          className={`${
            isDarkMode ? "text-white bg-[#1f1833]" : "text-black bg-white"
          } md:w-full h-12 rounded-xl flex justify-center items-center mt-2`}
        >
          <LinkIcon className="w-5 h-5 md:mr-2" />
          <a href={linkOne} target="_blank">
            {linkOne}
          </a>
          <button onClick={() => copyToClipboard(linkOne)}>
            <Square2StackIcon className="w-5 h-5 md:ml-2" />
          </button>
        </div>
        <div
          className={`${
            isDarkMode ? "text-white bg-[#1f1833]" : "text-black bg-white"
          } md:w-full h-12 rounded-xl flex justify-center items-center mt-8`}
        >
          <LinkIcon className="w-5 h-5 md:mr-2" />
          <a href={linkTwo} target="_blank">
            {linkTwo}
          </a>
          <button onClick={() => copyToClipboard(linkTwo)}>
            <Square2StackIcon className="w-5 h-5 md:ml-2" />
          </button>
        </div>
        <div
          className={`${
            isDarkMode ? "text-white bg-[#1f1833]" : "text-black bg-white"
          } md:w-full h-12 rounded-xl flex justify-center items-center mt-8`}
        >
          <LinkIcon className="w-5 h-5 md:mr-2" />
          <a href={linkThree} target="_blank">
            {linkThree}
          </a>
          <button onClick={() => copyToClipboard(linkThree)}>
            <Square2StackIcon className="w-5 h-5 md:ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinLinks;

"use client";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/20/solid";
import { Square2StackIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useAppSelector } from "@/redux/store";

type CoinMainInfoTypes = {
  symbol: string | undefined;
  name: string | undefined;
  image:
    | {
        thumb: string | undefined;
        small: string | undefined;
        large: string | undefined;
      }
    | undefined;
  links:
    | {
        homepage: string | undefined;
      }
    | undefined;
};

const CoinMainInfo: React.FC<CoinMainInfoTypes> = (props) => {
  const {
    symbol = "",
    name = "",
    image = { thumb: "", small: "", large: "" },
    links = { homepage: "" },
  } = props;

  const allCaps = symbol.toUpperCase();

  const homepageUrl = links.homepage ? links.homepage : "#";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(homepageUrl[0]);
      alert("Copied to Clipboard!");
    } catch (error) {
      console.error("Unable to copy to clipboard:", error);
    }
  };

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div className="h-full w-305">
      <div
        className={`${
          isDarkMode ? "text-white bg-[#1E1932]" : "text-black bg-white"
        } w-full h-265 rounded-xl flex items-center justify-center flex-col`}
      >
        <div
          className={`h-16 w-16 mb-8 rounded ${
            isDarkMode ? "bg-[#2C2C4A]" : "bg-gray-300"
          } flex items-center justify-center`}
        >
          <img className="w-8 h-8" src={image.large} alt="coin image" />
        </div>
        <h2 className="text-3xl">
          {name} ({allCaps})
        </h2>
      </div>
      <div
        className={`${
          isDarkMode ? "text-white bg-[#1E1932]" : "text-black bg-white"
        } w-full h-52 rounded-xl flex justify-center items-center mt-4 max-sm:mb-4`}
      >
        <div className={`w-full flex justify-center items-center`}>
          <LinkIcon className="w-5 h-5 mr-2" />
          <Link className="text-sm" href={homepageUrl[0]} target="_blank">
            {homepageUrl[0]}
          </Link>
          <button onClick={copyToClipboard}>
            <Square2StackIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinMainInfo;

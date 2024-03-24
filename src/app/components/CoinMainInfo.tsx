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
    <div
      className={`${
        isDarkMode ? "text-white bg-custom-dark2" : "text-black bg-gray-300"
      } w-80 h-64 rounded-2xl flex items-center justify-evenly flex-col`}
    >
      <div
        className={`h-24 w-24 rounded ${
          isDarkMode ? "bg-custom-dark1" : "bg-white"
        } flex items-center justify-center`}
      >
        <img className="w-16 h-16" src={image.large} alt="coin image" />
      </div>
      <div>
        <h2 className="text-2xl">
          {name} ({allCaps})
        </h2>
      </div>
      <div
        className={`${
          isDarkMode ? "bg-custom-dark1" : "bg-white"
        } w-11/12 h-8 rounded-xl flex justify-center items-center`}
      >
        <div className="w-full flex justify-evenly items-center">
          <LinkIcon className="w-5 h-5" />
          <Link href={homepageUrl[0]} target="_blank">
            {homepageUrl[0]}
          </Link>
          <button onClick={copyToClipboard}>
            <Square2StackIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinMainInfo;

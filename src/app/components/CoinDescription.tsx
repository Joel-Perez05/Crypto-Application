"use client";
import React, { useState, useEffect, useRef } from "react";
import { CoinType } from "../utils/CoinPageTypes";
import ReactHtmlParser from "react-html-parser";

type CoinDescriptionPropTypes = {
  description: CoinType["description"];
};

const CoinDescription: React.FC<CoinDescriptionPropTypes> = (props) => {
  const { description } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);

  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (ref.current) {
      setShowReadMoreButton(
        ref.current.scrollHeight >= ref.current.clientHeight
      );
    }
  }, []);

  return (
    <div
      className={`w-692 h-full dark:text-white text-black rounded-xl text-sm `}
    >
      <p
        className={`w-full text-sm ${isOpen ? null : "line-clamp-10"}`}
        ref={ref}
      >
        {ReactHtmlParser(description?.en as string)}
      </p>
      {showReadMoreButton && (
        <button
          className="text-[#6060FF] text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "...read less" : "...read more"}
        </button>
      )}
    </div>
  );
};

export default CoinDescription;

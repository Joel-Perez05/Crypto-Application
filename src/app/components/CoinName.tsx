"use client";
import Link from "next/link";
import { ReactNode } from "react";

type CoinNameType = {
  coinId: string;
  coinName: string;
  coinNameAllCaps: string;
  coinImg: string;
};

const CoinName: React.FC<CoinNameType> = (props) => {
  return (
    <div className="w-32 flex items-center">
      <img className="w-8 h-8 mr-1" src={props.coinImg} alt="coin logo" />
      <Link href={`/coin/${props.coinId}`}>
        {props.coinName}({props.coinNameAllCaps})
      </Link>
    </div>
  );
};

export default CoinName;

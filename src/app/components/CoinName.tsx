"use client";
import Link from "next/link";

type CoinNameType = {
  coinId: string;
  coinName: string;
  coinNameAllCaps: string;
  coinImg: string;
};

const CoinName: React.FC<CoinNameType> = (props) => {
  const { coinId, coinName, coinNameAllCaps, coinImg } = props;

  return (
    <div className="w-208 h-8 flex items-center">
      <img className="w-8 h-8 mr-1" src={coinImg} alt="coin logo" />
      <Link className="h-6 w-40" href={`/coin/${coinId}`}>
        {coinName}({coinNameAllCaps})
      </Link>
    </div>
  );
};

export default CoinName;

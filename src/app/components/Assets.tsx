"use client";
import React from "react";
import { PortfolioCoinData } from "../utils/CoinPageTypes";
import MyAssetInfo from "./MyAssetInfo";
import { AssetStateType } from "@/redux/features/assets-Slice";
import MarketDataInfo from "./MarketDataInfo";

type CoinDataProps = {
  allCoins: PortfolioCoinData;
  asset: AssetStateType;
};

const Assets: React.FC<CoinDataProps> = (props) => {
  const { allCoins, asset } = props;

  return (
    <main className="w-full h-60 flex justify-center mt-12 rounded-md border border-[#212140]">
      <MyAssetInfo
        coinName={asset.coinId}
        coinImg={allCoins.image}
        coinSymbol={allCoins.symbol}
        currentPrice={allCoins.current_price}
        priceWhenPurchased={asset.currentPrice}
        purchasePrice={asset.purchasePrice}
        purchaseDate={asset.date}
      />
      <MarketDataInfo />
    </main>
  );
};

export default Assets;

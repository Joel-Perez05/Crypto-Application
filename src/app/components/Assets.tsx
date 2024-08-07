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
    <main className="w-full h-216 flex justify-center mt-10 rounded-md border-2 dark:border-[#191932] border-[#7878FA]">
      <MyAssetInfo
        coinId={asset.id}
        coinName={asset.coinId}
        coinImg={allCoins.image}
        coinSymbol={allCoins.symbol}
        currentPrice={allCoins.current_price}
        priceWhenPurchased={asset.priceWhenPurchased}
        purchasePrice={asset.purchasedAmount}
        purchaseDate={asset.date}
      />
      <MarketDataInfo allCoins={allCoins} />
    </main>
  );
};

export default Assets;

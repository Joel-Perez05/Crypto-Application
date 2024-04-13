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
    <main className="w-full md:h-60 max-sm:max-h-96 flex justify-center max-sm:flex-col mt-12 rounded-md border border-[#212140]">
      <MyAssetInfo
        coinId={asset.id}
        coinName={asset.coinId}
        coinImg={allCoins.image}
        coinSymbol={allCoins.symbol}
        currentPrice={allCoins.current_price}
        priceWhenPurchased={asset.currentPrice}
        purchasePrice={asset.purchasePrice}
        purchaseDate={asset.date}
      />
      <MarketDataInfo allCoins={allCoins} />
    </main>
  );
};

export default Assets;

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CoinMainInfo from "@/app/components/CoinMainInfo";
import CoinAtlAthInfo from "@/app/components/CoinAtlAthInfo";
import CoinMarketInfo from "@/app/components/CoinMarketInfo";
import CoinDescription from "@/app/components/CoinDescription";
import CoinConvertor from "@/app/components/CoinConvertor";
import LineGraphCoinPage from "@/app/components/LineGraphCoinPage";

export type CoinType = {
  id: string;
  symbol?: string;
  name?: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  links?: {
    homepage: string;
    blockchain_site: string;
  };
  description?: {
    en?: string;
  };
  market_data?: {
    ath: {
      usd?: number;
    };
    ath_change_percentage: {
      usd?: number;
    };
    ath_date: {
      usd?: string;
    };
    atl: {
      usd?: number;
    };
    atl_change_percentage: {
      usd?: number;
    };
    atl_date: {
      usd?: string;
    };
    current_price: {
      usd?: number;
    };
    price_change_percentage_24h?: number;
    market_cap: {
      usd?: number;
    };
    market_cap_change_percentage_24h?: number;
    fully_diluted_valuation: {
      usd?: number;
    };
    total_volume: {
      usd?: number;
    };
    high_24h: {
      usd?: number;
    };
    circulating_supply?: number;
    max_supply?: number;
  };
};

type CoinPageProps = {
  params: {
    id: string;
  };
};

export type CoinPriceType = {
  prices?: Array<[number, number]>;
};

const CoinPage: React.FC<CoinPageProps> = ({ params }) => {
  const [coin, setCoin] = useState<CoinType>();
  const [coinPrice, setCoinPrice] = useState<CoinPriceType>();

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
      )
      .then((res) => {
        setCoin(res.data);
      })
      .catch((err) => err);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=180&interval=daily`
      )
      .then((res) => {
        setCoinPrice(res.data);
      })
      .catch((err) => err);
  }, [params.id]);

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="h-full md:w-full xl:w-1/2 p-4 bg-custom-dark1">
          <h2 className="text-white text-3xl">Your Summary:</h2>
          <div className="mt-6 flex justify-around">
            <CoinMainInfo
              links={coin?.links}
              image={coin?.image}
              symbol={coin?.symbol}
              name={coin?.name}
            />
            <CoinAtlAthInfo market_data={coin?.market_data} />
            <CoinMarketInfo
              symbol={coin?.symbol}
              market_data={coin?.market_data}
            />
          </div>
          <h2 className="text-white text-3xl mt-6">Description:</h2>
          <CoinDescription
            description={coin?.description}
            links={coin?.links}
          />
          <CoinConvertor
            symbol={coin?.symbol}
            market_data={coin?.market_data}
          />
        </div>
      </main>
      <div className="-mt-24">
        <LineGraphCoinPage prices={coinPrice?.prices} />
      </div>
    </div>
  );
};

export default CoinPage;

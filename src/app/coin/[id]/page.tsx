"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CoinMainInfo from "@/app/components/CoinMainInfo";

type CoinType = {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  links: {
    homepage: string;
  };
};

type CoinPageProps = {
  params: {
    id: string;
  };
};

const CoinPage: React.FC<CoinPageProps> = ({ params }) => {
  const [coin, setCoin] = useState<CoinType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
        );
        console.log(res.data);
        setCoin(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [params.id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-full md:w-full xl:w-1/2 p-4 bg-custom-dark1">
        <h2 className="text-white text-3xl">Your Summary:</h2>
        <div className="mt-6">
          <CoinMainInfo
            links={coin?.links}
            image={coin?.image}
            symbol={coin?.symbol}
            name={coin?.name}
          />
        </div>
      </div>
    </main>
  );
};

export default CoinPage;

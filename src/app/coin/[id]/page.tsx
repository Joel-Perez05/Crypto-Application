"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type CoinType = {
  id: string;
  symbol: string;
  name: string;
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

  return <div>{coin?.name}</div>;
};

export default CoinPage;

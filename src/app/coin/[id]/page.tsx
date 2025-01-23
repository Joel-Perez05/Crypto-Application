"use client";
import { useEffect, useState } from "react";
import { CoinType } from "@/app/utils/CoinPageTypes";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import ErrorHandler from "./ErrorHandler";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import CoinMainInfo from "@/app/components/CoinMainInfo";
import CoinAtlAthInfo from "@/app/components/CoinAtlAthInfo";
import CoinMarketInfo from "@/app/components/CoinMarketInfo";
import CoinDescription from "@/app/components/CoinDescription";
import CoinLinks from "@/app/components/CoinLinks";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";

type CoinPageProps = {
  params: {
    id: string;
  };
};

const CoinPage: React.FC<CoinPageProps> = ({ params }) => {
  const [coin, setCoin] = useState<CoinType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  const selectedCurrency = useAppSelector((state) => state.currency);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinResponse = await axios.get("/api/individualCoinPage", {
          params: {
            coin: params.id,
          },
        });
        setCoin(coinResponse.data);

        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [params.id, selectedCurrency]);

  return (
    <div className="w-full dark:bg-[#13121A] bg-[#f2f2fd] flex justify-center">
      {error ? (
        <ErrorHandler error={error} />
      ) : isLoading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <main
          className={`dark:bg-[#13121A] bg-[#f2f2fd] flex min-h-screen flex-col items-center justify-between w-1296`}
        >
          <div className={`h-full w-full mt-14`}>
            <div className="flex items-center">
              <Link href="/">
                <ArrowLeftIcon className="text-white w-5 h-5 mr-2" />
              </Link>
              <h2 className={`dark:text-white text-black text-xl`}>
                Portfolio / Your {coin?.name} Summary
              </h2>
            </div>
            <div className="w-full h-420 flex justify-between mt-10">
              <div className="w-692 h333 flex justify-between">
                <CoinMainInfo
                  links={coin?.links}
                  image={coin?.image}
                  symbol={coin?.symbol}
                  name={coin?.name}
                />
                <CoinAtlAthInfo
                  market_data={coin?.market_data}
                  name={coin?.name}
                />
              </div>
              <CoinMarketInfo
                symbol={coin?.symbol}
                market_data={coin?.market_data}
              />
            </div>
            <h2 className={`text-xl mb-4 mt-20 dark:text-white text-black`}>
              Description
            </h2>
            <div className="flex w-full justify-between  h-204">
              <CoinDescription description={coin?.description} />
              <CoinLinks links={coin?.links} />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default CoinPage;

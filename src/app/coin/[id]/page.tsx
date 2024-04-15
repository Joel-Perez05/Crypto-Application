"use client";
import { useEffect, useState } from "react";
import { CoinType, CoinPriceType } from "@/app/utils/CoinPageTypes";
import axios from "axios";
import ErrorHandler from "./ErrorHandler";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import CoinMainInfo from "@/app/components/CoinMainInfo";
import CoinAtlAthInfo from "@/app/components/CoinAtlAthInfo";
import CoinMarketInfo from "@/app/components/CoinMarketInfo";
import CoinDescription from "@/app/components/CoinDescription";
import CoinConvertor from "@/app/components/CoinConvertor";
import LineGraphCoinPage from "@/app/components/LineGraphCoinPage";
import { useAppSelector } from "@/redux/store";
import { useSelectedCurrency } from "@/redux/features/currency-Slice";
import CoinLinks from "@/app/components/CoinLinks";

type CoinPageProps = {
  params: {
    id: string;
  };
};

const CoinPage: React.FC<CoinPageProps> = ({ params }) => {
  const [coin, setCoin] = useState<CoinType>();
  // const [coinPrice, setCoinPrice] = useState<CoinPriceType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const selectedCurrency = useSelectedCurrency();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
        );

        // const coinPriceResponse = await axios.get(
        //   `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${selectedCurrency.currency}&days=180&interval=daily`
        // );

        setCoin(coinResponse.data);
        // setCoinPrice(coinPriceResponse.data);
        // setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        // setError(error.message);
      }
    };

    fetchData();
  }, [params.id, selectedCurrency]);

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div className="max-sm:mt-14">
      {error ? (
        <ErrorHandler error={error} />
      ) : isLoading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <main
          className={`${
            isDarkMode ? "bg-custom-dark2" : "bg-gray-300"
          } flex min-h-screen flex-col items-center justify-between md:p-20`}
        >
          <div className={`h-full max-sm:w-full md:w-full xl:w-1/2`}>
            <h2
              className={`${isDarkMode ? "text-white" : "text-black"} text-3xl`}
            >
              Your Summary:
            </h2>
            <div className="mt-6 flex max-sm:flex-col">
              <div className="flex justify-between flex-col md:w-7/12 w-full">
                <div className={` rounded-md flex md:w-full justify-between`}>
                  <CoinMainInfo
                    links={coin?.links}
                    image={coin?.image}
                    symbol={coin?.symbol}
                    name={coin?.name}
                  />
                  <CoinAtlAthInfo market_data={coin?.market_data} />
                </div>
                <div>
                  <CoinConvertor
                    symbol={coin?.symbol}
                    market_data={coin?.market_data}
                  />
                </div>
                <div>
                  <CoinDescription description={coin?.description} />
                </div>
              </div>
              <div className="md:w-5/12 md:ml-6">
                <div>
                  <CoinMarketInfo
                    symbol={coin?.symbol}
                    market_data={coin?.market_data}
                  />
                </div>
                <div>
                  <CoinLinks links={coin?.links} />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default CoinPage;

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import FormToggler from "../components/FormToggler";
import CoinForm from "../components/CoinForm";
import { FormCoin, FormData, PortfolioCoinData } from "../utils/CoinPageTypes";
import Assets from "../components/Assets";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getAssets } from "@/redux/features/assets-Slice";
import ErrorHandler from "./ErrorHandler";
import LoadingSpinner from "../components/LoadingSpinner";
import NoSavedCoins from "../components/NoSavedCoins";

const Portfolio = () => {
  const selectedCurrency = useAppSelector((state) => state.currency);

  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [coinData, setCoinData] = useState<FormData[]>([]);
  const [formToggler, setFormToggler] = useState<boolean>(false);
  const [allCoins, setAllCoins] = useState<PortfolioCoinData[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinDataResponse = await axios.get("/api/portfolioPage", {
          params: {
            vs_currency: selectedCurrency.currency,
          },
        });
        const formData: FormData[] = coinDataResponse.data.map(
          (coin: FormCoin) => ({
            id: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            current_price: coin.current_price,
            image: coin.image,
          })
        );
        const coinMarketData: PortfolioCoinData[] = coinDataResponse.data.map(
          (coin: PortfolioCoinData) => ({
            id: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            image: coin.image,
            current_price: coin.current_price,
            market_cap: coin.market_cap,
            total_volume: coin.total_volume,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            circulating_supply: coin.circulating_supply,
            total_supply: coin.total_supply,
            max_supply: coin.max_supply,
          })
        );
        setCoinData(formData);
        setAllCoins(coinMarketData);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      }
    };

    fetchData();
    dispatch(getAssets());
  }, [dispatch, selectedCurrency]);

  const assets = useAppSelector((state) => state.assets?.value);

  return (
    <div
      className={`w-full flex justify-center dark:bg-[#13121A] bg-[#f2f2fd]`}
    >
      {error ? (
        <ErrorHandler error={error} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <main
          className={`dark:bg-[#13121A] bg-[#f2f2fd] flex min-h-screen flex-col items-center justify-between w-1296`}
        >
          <div className={`h-full w-full dark:bg-[#13121A] bg-[#f2f2fd]`}>
            <FormToggler
              formToggler={formToggler}
              setFormToggler={setFormToggler}
            />
            {formToggler && (
              <CoinForm
                coinData={coinData}
                formToggler={formToggler}
                setFormToggler={setFormToggler}
              />
            )}
            {assets.length > 0 ? (
              assets.map((asset) => {
                const matchedCoinData = allCoins.find(
                  (coin) => coin.name === asset.coinId
                );
                if (matchedCoinData) {
                  return (
                    <Assets
                      key={asset.id}
                      allCoins={matchedCoinData}
                      asset={asset}
                    />
                  );
                }
              })
            ) : (
              <NoSavedCoins />
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default Portfolio;

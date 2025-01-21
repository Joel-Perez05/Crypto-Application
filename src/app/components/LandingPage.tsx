"use client";
import Coins from "./Coins";
import axios from "axios";
import { useEffect, useState } from "react";
import CoinConverterToggle from "./CoinConverterToggle";
import HomePageGraphs from "./HomePageGraphs";
import CoinConvertorPage from "./CoinConvertorPage";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toggleInitialGraph } from "@/redux/features/graphs-slice";
import { setSortedCoins } from "@/redux/features/sort-Slice";
import { store } from "@/redux/store";
import LoadingSpinner from "./LoadingSpinner";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const selectedToggle = useAppSelector((state) => state.toggler.toggler);
  const selectedCurrency = useAppSelector((state) => state.currency);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stateCoinA = store.getState().graphs.coinA.name;
        const stateCoinB = store.getState().graphs.coinB.name;
        if (stateCoinA && stateCoinB) return;

        const chartData = await axios.get(
          `/api/landingPage/getHomePageGraphsData`,
          {
            params: {
              vs_currency: selectedCurrency.currency,
            },
          }
        );
        const priceAndVol = await axios.get(
          "/api/landingPage/getHomePageDailyData",
          {
            params: {
              vs_currency: selectedCurrency.currency,
            },
          }
        );
        dispatch(
          toggleInitialGraph({
            name: "bitcoin",
            pricesArr: chartData.data.prices,
            volumeArr: chartData.data.total_volumes,
            price: priceAndVol.data.bitcoin[`${selectedCurrency.currency}`],
            volume:
              priceAndVol.data.bitcoin[`${selectedCurrency.currency}_24h_vol`],
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedCurrency.currency, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinResponse = await axios.get("/api/landingPage/getCoinsTable", {
          params: {
            vs_currency: selectedCurrency.currency,
            per_page: 50,
          },
        });
        setIsLoading(false);
        dispatch(setSortedCoins(coinResponse.data));
      } catch (error: any) {
        console.error("Error fetching coin table data:", error.message);
      }
    };
    fetchData();
  }, [selectedCurrency.currency, dispatch]);

  return isLoading ? (
    <div>
      <LoadingSpinner />
    </div>
  ) : (
    <main
      className={`h-full w-1296 mt-14 mb-14 dark:bg-[#13121A] bg-[#f2f2fd]`}
    >
      <CoinConverterToggle />
      {selectedToggle === "coins" ? (
        <>
          {" "}
          <HomePageGraphs />
          <Coins />
        </>
      ) : (
        <CoinConvertorPage />
      )}
    </main>
  );
}

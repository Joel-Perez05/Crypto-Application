"use client";
import { useEffect, useState } from "react";
import CoinName from "./CoinName";
import CoinPriceChange from "./CoinPriceChange";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  AdjustmentsVerticalIcon,
  ChevronUpDownIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/20/solid";
import numeral from "numeral";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartData,
  LineElement,
  PointElement,
  CategoryScale,
  Tooltip,
  LinearScale,
} from "chart.js";
import classes from "../../styles/scrollbar.module.css";
import queryString from "query-string";
import CoinProgressBars from "./CoinProgressBars";

const apiUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  market_cap: number;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number;
  sparkline_in_7d: SparklinePrice;
};

type SparklinePrice = {
  price: [number];
};
export default function Coins() {
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [totalSupplySort, setTotalSupplySort] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(10);
  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);
    const initialSort = urlParams.sort === "totalSupply";

    setTotalSupplySort(initialSort);

    axios
      .get(apiUrl)
      .then((res) => {
        const sortedCoins = res.data.sort((a: Coin, b: Coin) =>
          initialSort
            ? b.total_supply - a.total_supply
            : b.market_cap - a.market_cap
        );
        setAllCoins(sortedCoins);
      })
      .catch((err) => err);
  }, [displayCount]);

  const roundToSixth = (number: number) => {
    const rounded = Math.round(number * 1e6) / 1e6;
    if (number < 1) {
      return numeral(rounded).format("0.000000");
    } else return rounded;
  };

  const formatToNearestTenth = (number: number) => {
    const roundedPercent = Math.ceil(number * 10) / 10;
    return numeral(roundedPercent).format("0.0");
  };

  const convertToShorterNum = (number: number) => {
    if (number >= 1000000000000) {
      return numeral(number / 1000000000000).format("0.00") + "T";
    } else if (number >= 1000000000) {
      return numeral(number / 1000000000).format("0.00") + "B";
    } else if (number >= 1000000) {
      return numeral(number / 1000000).format("0.00") + "M";
    } else if (number >= 100000) {
      return numeral(number / 100000).format("0.00") + "K";
    } else {
      return numeral(number).format("0,0");
    }
  };

  const sparklineData = allCoins.map((coin) => {
    if (coin.sparkline_in_7d.price) {
      const dailyPrices = [];
      let dailyPriceAccumulator = 0;

      for (let i = 0; i < coin.sparkline_in_7d.price.length; i++) {
        dailyPriceAccumulator += coin.sparkline_in_7d.price[i];

        if ((i + 1) % 24 === 0 || i === coin.sparkline_in_7d.price.length - 1) {
          const averagePrice = dailyPriceAccumulator / 24;
          dailyPrices.push(averagePrice);
          dailyPriceAccumulator = 0;
        }
      }

      return {
        id: coin.id,
        dailyPrices,
      };
    }
  });

  const handleNext = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip
  );

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 7,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const lables = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];

  const toggleCoinSort = () => {
    setTotalSupplySort((prevState) => {
      const totalSupplySortToggle = !prevState;

      const coins = allCoins.slice();

      if (totalSupplySortToggle === false) {
        coins.sort((a, b) => b.market_cap - a.market_cap);
      } else {
        coins.sort((a, b) => b.total_supply - a.total_supply);
      }
      setAllCoins(coins);

      const sortUrl = totalSupplySortToggle ? "totalSupply" : "marketCap";
      const newQueryString = queryString.stringify({
        ...queryString.parse(window.location.search),
        sort: sortUrl,
      });

      window.history.pushState(null, "", `?${newQueryString}`);

      return totalSupplySortToggle;
    });
  };

  return (
    <div className="bg-custom-dark2 w-11/12 rounded-2xl h-full p-4">
      <div className="flex text-white">
        <h2 className="text-3xl font-bold flex items-end mr-2">
          <span>
            <ChevronUpDownIcon className="w-5 h-5 mb-1" />
          </span>
          TOP 50 COINS
        </h2>
        <button
          onClick={() => {
            toggleCoinSort();
          }}
          className="flex items-end mb-1"
        >
          {totalSupplySort ? "BY TOTAL SUPPLY" : "BY MARKET CAP"}
          <span>
            <ChevronDoubleDownIcon className="w-4 h-4 mb-1" />
          </span>
        </button>
      </div>
      <table className="table-auto w-full">
        <thead className="">
          <tr className="text-white text-xs flex justify-between border-b h-14 mt-6">
            <th className="w-6">#</th>
            <th className="w-24">Name</th>
            <th className="w-20">Price</th>
            <th className="w-8">1h%</th>
            <th className="w-8">24h%</th>
            <th className="w-6">7d%</th>
            <th className="w-36">24h Vol / Market Cap</th>
            <th className="w-36"> Circulating / Total Sup</th>
            <th className="w-32 flex justify-center">
              Last 7d
              <span>
                <AdjustmentsVerticalIcon className="h-4 w-4 ml-1" />
              </span>
            </th>
          </tr>
        </thead>
      </table>
      <InfiniteScroll
        dataLength={displayCount}
        next={handleNext}
        hasMore={displayCount < 50}
        loader={<h4>Loading...</h4>}
        height={650}
        className={classes.customInfiniteScroll}
      >
        <table className="table-auto w-full">
          <tbody className=" text-white">
            {allCoins.map((coin, idx) => {
              const allCaps = coin.symbol.toUpperCase();
              const price = roundToSixth(coin.current_price);
              const pricePercent1 = formatToNearestTenth(
                coin.price_change_percentage_1h_in_currency
              );
              const pricePercent24 = formatToNearestTenth(
                coin.price_change_percentage_24h_in_currency
              );
              const pricePercent7 = formatToNearestTenth(
                coin.price_change_percentage_7d_in_currency
              );
              const totalVolume = convertToShorterNum(coin.total_volume);
              const totalMarket = convertToShorterNum(coin.market_cap);
              const circulating = convertToShorterNum(coin.circulating_supply);
              const totalSupply = convertToShorterNum(coin.total_supply);
              const lastCoin = idx === allCoins.length - 1;

              const data: ChartData<"line", number[], string> = {
                labels: lables,
                datasets: sparklineData.map((coinData) => ({
                  data: coin.id === coinData?.id ? coinData?.dailyPrices : [],
                  tension: 0.4,
                  borderColor:
                    coin.price_change_percentage_7d_in_currency < 0
                      ? "red"
                      : "green",
                  fill: true,
                  pointStyle: false,
                  backgroundColor: "rgb(20, 20, 30)",
                })),
              };
              return (
                <tr
                  className={`${
                    lastCoin ? "border-b-0" : ""
                  } text-xs flex text-center justify-between items-center h-24 border-b`}
                  key={coin.id}
                >
                  <td className="w-6">{idx + 1}</td>
                  <td>
                    <CoinName
                      coinId={coin.id}
                      coinName={coin.name}
                      coinNameAllCaps={allCaps}
                      coinImg={coin.image}
                    />
                  </td>
                  <td className="w-20">${price}</td>
                  <td>
                    <CoinPriceChange
                      percentChangeRounded={pricePercent1}
                      percentChangeActual={
                        coin.price_change_percentage_1h_in_currency
                      }
                    />
                  </td>
                  <td>
                    <CoinPriceChange
                      percentChangeRounded={pricePercent24}
                      percentChangeActual={
                        coin.price_change_percentage_24h_in_currency
                      }
                    />
                  </td>
                  <td>
                    <CoinPriceChange
                      percentChangeRounded={pricePercent7}
                      percentChangeActual={
                        coin.price_change_percentage_7d_in_currency
                      }
                    />
                  </td>
                  <td>
                    <CoinProgressBars
                      titleColor="text-green-400"
                      titleCompleted={totalVolume}
                      completed={coin.total_volume}
                      completedColor="#4ade80"
                      titleMaxColor={"text-teal-800"}
                      titleMaxCompleted={totalMarket}
                      maxCompleted={coin.market_cap}
                      maxCompletedColor="#115e59"
                    />
                  </td>
                  <td>
                    <CoinProgressBars
                      titleColor="text-pink-500"
                      titleCompleted={circulating}
                      completed={coin.circulating_supply}
                      completedColor="#ec4899"
                      titleMaxColor={"text-rose-800"}
                      titleMaxCompleted={totalSupply}
                      maxCompleted={coin.total_supply}
                      maxCompletedColor="#9f1239"
                    />
                  </td>
                  <td className="w-32">
                    <Line data={data} options={options} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}

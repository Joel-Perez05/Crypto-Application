"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  AdjustmentsVerticalIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  ChevronUpDownIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/20/solid";
import numeral from "numeral";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  LineElement,
  PointElement,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import ProgressBar from "@ramonak/react-progress-bar";
import { useLocalState } from "@/hooks/useLocalState";

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

const colorPairs = [
  { primary: "#e2e8f0", secondary: "#1e293b" },
  { primary: "#ef4444", secondary: "#fb923c" },
  { primary: "#fde047", secondary: "#65a30d" },
  { primary: "#4ade80", secondary: "#115e59" },
  { primary: "#22d3ee", secondary: "#082f49" },
];

export default function Coins() {
  const [allCoins, setAllCoins] = useLocalState<Coin[]>("coins", []);
  const [coinSparkLineData, setCoinSparkLineData] = useState<[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(10);
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        const sortedCoins = res.data.sort(
          (a: Coin, b: Coin) => b.market_cap - a.market_cap
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

  return (
    <div className="bg-custom-dark2 w-11/12 rounded-2xl h-full p-4">
      <div className="flex text-white">
        <h2 className="text-3xl font-bold flex items-end mr-2">
          <span>
            <ChevronUpDownIcon className="w-5 h-5 mb-1" />
          </span>
          TOP 50 COINS
        </h2>
        <button className="flex items-end mb-1">
          BY MARKET CAP{" "}
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

              const colorPair = colorPairs[idx % 5];
              return (
                <tr
                  className={`${
                    lastCoin ? "border-b-0" : ""
                  } text-xs flex text-center justify-between items-center h-24 border-b`}
                  key={coin.id}
                >
                  <td className="w-6">{idx + 1}</td>
                  <td className="w-32 flex items-center">
                    <img
                      className="w-8 h-8 mr-1"
                      src={coin.image}
                      alt="coin logo"
                    />
                    {coin.name}({allCaps})
                  </td>
                  <td className="w-20">${price}</td>
                  <td
                    className={`${
                      coin.price_change_percentage_1h_in_currency < 0
                        ? "text-red-600"
                        : "text-green-600"
                    } flex justify-center`}
                  >
                    <span>
                      {coin.price_change_percentage_1h_in_currency < 0 ? (
                        <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
                      ) : (
                        <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
                      )}
                    </span>
                    {pricePercent1}%
                  </td>
                  <td
                    className={`${
                      coin.price_change_percentage_24h_in_currency < 0
                        ? "text-red-600"
                        : "text-green-600"
                    } flex justify-center`}
                  >
                    <span>
                      {coin.price_change_percentage_24h_in_currency < 0 ? (
                        <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
                      ) : (
                        <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
                      )}
                    </span>
                    {pricePercent24}%
                  </td>
                  <td
                    className={`${
                      coin.price_change_percentage_7d_in_currency < 0
                        ? "text-red-600"
                        : "text-green-600"
                    } flex justify-center`}
                  >
                    <span>
                      {coin.price_change_percentage_7d_in_currency < 0 ? (
                        <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
                      ) : (
                        <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
                      )}
                    </span>
                    {pricePercent7}%
                  </td>
                  <td className="w-36">
                    <span className="flex justify-around">
                      <p>{totalVolume}</p>
                      <p>{totalMarket}</p>
                    </span>
                    <span>
                      <ProgressBar
                        completed={coin.total_volume}
                        maxCompleted={coin.market_cap}
                        bgColor={colorPair.primary}
                        baseBgColor={colorPair.secondary}
                        height="10px"
                        width="80%"
                        isLabelVisible={false}
                        className="flex justify-center"
                      />
                    </span>
                  </td>
                  <td className="w-36">
                    <span className="flex justify-around">
                      <p className={`text-${colorPair.primary}`}>
                        {circulating}
                      </p>
                      <p className={`colorPair.secondary`}>{totalSupply}</p>
                    </span>
                    <span>
                      <ProgressBar
                        completed={coin.circulating_supply}
                        maxCompleted={coin.total_supply}
                        bgColor={colorPair.primary}
                        baseBgColor={colorPair.secondary}
                        height="10px"
                        width="80%"
                        isLabelVisible={false}
                        className="flex justify-center"
                      />
                    </span>
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

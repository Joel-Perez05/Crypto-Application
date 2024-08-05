"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { Line } from "react-chartjs-2";
import homepageGradient from "../utils/homePageGraphGradients";
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  ChartDataset,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAppSelector } from "@/redux/store";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const [todaysDate, setTodaysDate] = useState<string>("");
  const [todaysPrice, setTodaysPrice] = useState<number | undefined>(0);

  const selectedCurrency = useAppSelector((state) => state.currency);
  const selectedInterval = useAppSelector((state) => state.interval.interval);
  const defaultPrices = useAppSelector((state) => state.graphs.coinA.prices);
  const coinPrice = useAppSelector((state) => state.sort.sortedCoins);
  const defaultCoinName = useAppSelector((state) => state.graphs.coinA.name);

  useEffect(() => {
    const getTodaysPrice = coinPrice.find(
      (coin) => coin.id === defaultCoinName
    );
    setTodaysPrice(getTodaysPrice?.current_price);

    const dateObject = new Date();
    const formattedDate = format(dateObject, "MMMM dd, yyyy");
    setTodaysDate(formattedDate);
  }, [selectedCurrency.currency]);

  interface CustomChartOptions extends ChartOptions {
    height?: number;
    width?: number;
    scales?: {
      x?: {
        type?: "linear";
        display?: boolean;
        min?: number;
        max?: number;
        grid?: {
          display?: boolean;
        };
        ticks?: {
          display?: boolean;
          font?: {
            size?: number;
          };
        };
      };
      y?: {
        type?: "linear";
        display?: boolean;
        ticks?: {
          display?: boolean;
        };
        grid?: {
          display?: boolean;
        };
      };
    };
  }

  const options: CustomChartOptions = {
    maintainAspectRatio: false,
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
      subtitle: {
        display: true,
      },
    },
    scales: {
      x: {
        min: selectedInterval,
        max: 365,
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const labels = defaultPrices.map((date) => {
    const utcTimestamp = date[0];
    const dateObj = new Date(utcTimestamp);

    const formattedDate = format(dateObj, "dd");
    return formattedDate;
  });

  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: "Bitcoin Price",
        data: defaultPrices.map((price) => price[1]),
        tension: 0.4,
        borderColor: "#7878FA",
        pointStyle: false,
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return homepageGradient(
            ctx,
            chartArea,
            "#7474f263",
            "#7474f260",
            "#1b1932"
          );
        },
      } as ChartDataset<"line", number[]>,
    ],
  };

  return (
    <div
      className={`rounded-xl flex flex-col justify-between p-6 w-632 h-full dark:text-[#7474f260] dark:bg-[#1b1932] bg-white`}
    >
      <div className="w-174 h-116 flex flex-col justify-between">
        <h3 className="w-160 h-6 dark:text-[#D1D1D1] text-[#191932] text-xl">
          Bitcoin (BTC)
        </h3>
        <div className="w-174 h-68  flex flex-col justify-between">
          {todaysPrice ? (
            <h2 className="dark:text-white text-[#181825] text-3xl font-bold">
              {selectedCurrency.symbol}
              {todaysPrice}
            </h2>
          ) : (
            <h2 className="dark:text-white text-[#181825] text-3xl font-bold">
              {selectedCurrency.symbol} 0
            </h2>
          )}

          <h3 className="dark:text-[#B9B9BA] text-[#424286]">{todaysDate}</h3>
        </div>
      </div>
      <div className="w-584 h-216">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

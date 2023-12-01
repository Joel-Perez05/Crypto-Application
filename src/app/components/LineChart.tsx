"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { Line } from "react-chartjs-2";
import getGradient from "../utils/getGradient";
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
  const [bitcoinPrice, setBitcoinPrice] = useState<[]>([]);
  const [todaysDate, setTodaysDate] = useState<string>("");
  const [todaysPrice, setTodaysPrice] = useState<number>(0);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
      )
      .then((res) => {
        setBitcoinPrice(res.data.prices);
      })
      .catch((err) => err);
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=2"
      )
      .then((res) => {
        setTodaysPrice(res.data.bitcoin.usd);
      })
      .catch((err) => err);
    const dateObject = new Date();
    const formattedDate = format(dateObject, "MMM dd, yyyy");
    setTodaysDate(formattedDate);
  }, []);

  interface CustomChartOptions extends ChartOptions {
    height?: number;
    width?: number;
    scales?: {
      x?: {
        type?: "linear";
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
        min: 150,
        max: 180,
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          font: {
            size: 14,
          },
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

  const labels = bitcoinPrice.map((date) => {
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
        data: bitcoinPrice.map((price) => price[1]),
        tension: 0.4,
        borderColor: "#00FF5F",
        pointStyle: false,
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
      } as ChartDataset<"line", number[]>,
    ],
  };

  return (
    <div>
      <div className=" z-40 absolute">
        <h3>Bitcoin</h3>
        <h2 className="text-2xl">${todaysPrice}</h2>
        <h3>{todaysDate}</h3>
      </div>
      <div>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

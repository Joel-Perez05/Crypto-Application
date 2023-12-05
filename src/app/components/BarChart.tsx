"use client";
import { useEffect, useState } from "react";
import numeral from "numeral";
import { format } from "date-fns";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  ChartDataset,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const [bitcoinVolume, setBitcoinVolume] = useState<[]>([]);
  const [todaysDate, setTodaysDate] = useState<string>("");
  const [todaysVolume, setTodaysVolume] = useState<number>(0);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
      )
      .then((res) => {
        setBitcoinVolume(res.data.total_volumes);
      })
      .catch((err) => err);
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_vol=true&precision=2"
      )
      .then((res) => {
        setTodaysVolume(res.data.bitcoin.usd_24h_vol);
      })
      .catch((err) => err);
    const dateObject = new Date();
    const formattedDate = format(dateObject, "MMM dd, yyyy");
    setTodaysDate(formattedDate);
  }, []);

  const formatBitcoinVolume = (volume: number) => {
    if (volume >= 1000000000) {
      return numeral(volume / 1000000000).format("0.00") + " bln";
    } else if (volume >= 1000000) {
      return numeral(volume / 1000000).format("0.00") + " mln";
    } else {
      return numeral(volume).format("0,0");
    }
  };

  const formattedVolume = formatBitcoinVolume(todaysVolume);

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

  const labels = bitcoinVolume.map((date) => {
    const utcTimestamp = date[0];
    const dateObj = new Date(utcTimestamp);

    const formattedDate = format(dateObj, "dd");
    return formattedDate;
  });

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: "24h Volume",
        data: bitcoinVolume.map((volume) => volume[1]),
        tension: 0.4,
        borderColor: "#00FF5F",
        pointStyle: false,
        fill: true,
        backgroundColor: "rgb(52, 88, 235)",
      } as ChartDataset<"bar", number[]>,
    ],
  };

  return (
    <div>
      <div className="z-40 absolute">
        <h3>24h Volume</h3>
        <h2 className="text-2xl">{formattedVolume}</h2>
        <h3>{todaysDate}</h3>
      </div>
      <div className="w-full h-full pt-10">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

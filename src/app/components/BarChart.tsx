"use client";
import { useEffect, useState } from "react";
import numeral from "numeral";
import { format } from "date-fns";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { useAppSelector } from "@/redux/store";
import homepageGradient from "../utils/homePageGraphGradients";
import { useSelectedCurrency } from "@/redux/features/currency-Slice";
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
import { useSelectedInterval } from "@/redux/features/interval-Slice";

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
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  const selectedCurrency = useSelectedCurrency();

  const selectedInterval = useSelectedInterval();

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${selectedCurrency.currency}&days=365&interval=daily`
      )
      .then((res) => {
        setBitcoinVolume(res.data.total_volumes);
      })
      .catch((err) => err);
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${selectedCurrency.currency}&include_24hr_vol=true&precision=2`
      )
      .then((res) => {
        setTodaysVolume(res.data.bitcoin.usd_24h_vol);
      })
      .catch((err) => err);
    const dateObject = new Date();
    const formattedDate = format(dateObject, "MMMM dd, yyyy");
    setTodaysDate(formattedDate);
  }, [selectedCurrency.symbol]);

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
        borderColor: "#9D62D9",
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
            "#9D62D9",
            "#B374F2",
            "#201932"
          );
        },
        borderRadius: 4,
      } as ChartDataset<"bar", number[]>,
    ],
  };

  return (
    <div
      className={`rounded-xl flex flex-col justify-between p-6 w-632 h-full ${
        isDarkMode ? " bg-[#201932]" : " bg-gray-300"
      } `}
    >
      <div className="w-174 h-116 flex flex-col justify-between">
        <h3 className="w-160 h-6 text-[#D1D1D1] text-xl">Volume 24h</h3>
        <div className="w-174 h-68  flex flex-col justify-between">
          <h2 className="text-white text-3xl font-bold">
            {selectedCurrency.symbol}
            {formattedVolume}
          </h2>
          <h3 className="text-[#B9B9BA]">{todaysDate}</h3>
        </div>
      </div>
      <div className="w-584 h-216">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import numeral from "numeral";
import { format } from "date-fns";
import { Bar } from "react-chartjs-2";
import homepageGradient from "../utils/homePageGraphGradients";
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
import { useAppSelector } from "@/redux/store";
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
  const [todaysDate, setTodaysDate] = useState<string>("");

  const selectedCurrency = useAppSelector((state) => state.currency);
  const selectedInterval = useAppSelector((state) => state.interval.interval);
  const defaultVolumes = useAppSelector(
    (state) => state.graphs.coinA.volumeArr
  );
  const coinVolume = useAppSelector((state) => state.graphs.coinA.volume);

  useEffect(() => {
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

  const formattedVolume = formatBitcoinVolume(coinVolume);

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

  const labels = defaultVolumes?.map((date) => {
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
        data: defaultVolumes?.map((volume) => volume[1]),
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
      className={`rounded-xl flex flex-col justify-between p-6 w-632 h-full dark:bg-[#201932] bg-white `}
    >
      <div className="w-174 h-116 flex flex-col justify-between">
        <h3 className="w-160 h-6 dark:text-[#D1D1D1] text-[#191932] text-xl">
          Volume 24h
        </h3>
        <div className="w-174 h-68  flex flex-col justify-between">
          {coinVolume ? (
            <h2 className="dark:text-white text-[#181825] text-3xl font-bold">
              {selectedCurrency.symbol}
              {formattedVolume}
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
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

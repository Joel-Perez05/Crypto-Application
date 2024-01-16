"use client";
import React, { useState } from "react";
import format from "date-fns/format";
import getGradient from "../utils/getGradient";
import { CoinPriceType } from "../coin/[id]/page";
import { Line } from "react-chartjs-2";
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

type CoinNamePropsType = {
  prices: CoinPriceType["prices"];
};

const intervals = ["1d", "7d", "30d", "90d", "180d"];

const LineGraphCoinPage: React.FC<CoinNamePropsType> = (props) => {
  const { prices } = props;

  const [optionSelected, setOptionSelected] = useState<string>("");
  const [intervalChoice, setIntervalChoice] = useState<number>(149);

  const handleOptionSelect = (interval: string) => {
    setOptionSelected(interval);
    if (interval === "180d") {
      setIntervalChoice(0);
    } else if (interval === "90d") {
      setIntervalChoice(89);
    } else if (interval === "30d") {
      setIntervalChoice(149);
    } else if (interval === "7d") {
      setIntervalChoice(172);
    } else if (interval === "1d") {
      setIntervalChoice(179);
    }
  };

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
    maintainAspectRatio: false,
    aspectRatio: 2,
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
        min: intervalChoice,
        max: 180,
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

  const labels = prices?.map((date) => {
    const utcTimestamp = date[0];
    const dateObj = new Date(utcTimestamp);

    const formattedDate = format(dateObj, "dd");
    return formattedDate;
  });

  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: "Coin Price",
        data: prices?.map((price) => price[1]),
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
      <div className="flex justify-center">
        {intervals.map((interval) => {
          const uniqueBtnId = `option-${interval}`;
          const isSelected = optionSelected === interval;
          const isDefaultChecked = interval === "30d";
          return (
            <div key={interval} className="flex items-center space-x-10">
              <input
                className="hidden"
                id={uniqueBtnId}
                type="radio"
                name="interval"
                value={interval}
                onChange={() => handleOptionSelect(interval)}
                defaultChecked={isDefaultChecked}
              />
              <label
                className="flex items-center cursor-pointer text-white
                "
                htmlFor={uniqueBtnId}
              >
                <div
                  className={`w-9 h-9 mr-2 border-2 rounded-full flex flex-col items-center justify-center border-green-500 hover:border-green-900 ${
                    isSelected
                      ? "bg-green-500 text-white"
                      : "bg-custom-dark2 hover:border-green-900"
                  }`}
                ></div>
                {interval}
              </label>
            </div>
          );
        })}
      </div>
      <div className="w-full">
        <Line className="h-96" data={data} options={options} />
      </div>
    </div>
  );
};

export default LineGraphCoinPage;

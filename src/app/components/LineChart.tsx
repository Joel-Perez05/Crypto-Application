"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
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
import { capitalizeName, roundToSixth } from "../utils/formatFunctions";
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

  const selectedCurrency = useAppSelector((state) => state.currency);
  const selectedInterval = useAppSelector((state) => state.interval.interval);
  const coinAData = useAppSelector((state) => state.graphs.coinA);
  const coinBData = useAppSelector((state) => state.graphs.coinB);

  const pricesArrA = coinAData.pricesArr;
  const coinPriceA = coinAData.price;
  const coinAName = capitalizeName(coinAData.name);
  const coinBName = capitalizeName(coinBData.name);
  const pricesArrB = coinBData.pricesArr;
  const coinPriceB = coinBData.price;
  const roundedPrice = roundToSixth(coinPriceA);

  useEffect(() => {
    const dateObject = new Date();
    const formattedDate = format(dateObject, "MMMM dd, yyyy");
    setTodaysDate(formattedDate);
  }, [selectedCurrency.currency, coinAData, coinBData]);

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
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
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

  const optionsTwo = {
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
    },
    scales: {
      x: {
        min: selectedInterval,
        max: 365,
        display: false,
        grid: {
          display: false,
          borderWidth: 0,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          borderWidth: 0,
        },
      },
    },
  };

  const labels = pricesArrA?.map((date) => {
    const utcTimestamp = date[0];
    const dateObj = new Date(utcTimestamp);

    const formattedDate = format(dateObj, "dd");
    return formattedDate;
  });

  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: coinAData.name,
        data: pricesArrA?.map((price) => price[1]),
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

  const dataTwo: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: coinBData.name,
        data: pricesArrB?.map((price) => price[1]),
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
      } as ChartDataset<"line", number[]>,
    ],
  };

  return coinAData.name.length > 1 && coinBData.name.length > 1 ? (
    <div
      className={`rounded-xl flex flex-col justify-between p-6 w-632 h-full dark:text-[#7474f260] dark:bg-[#1b1932] bg-white`}
    >
      <h3 className="h-7 w-272 text-3xl dark:text-[#FFFFFF] text-[#181825]">
        {todaysDate}
      </h3>
      <div className="w-584 h-216">
        <div className="h-1/2">
          <Line options={optionsTwo} data={dataTwo} />
        </div>
        <div className="h-1/2">
          <Line options={options} data={data} />
        </div>
      </div>
      <div className="w-full h-6 text-xl flex">
        <div className="w-6 h-6 rounded-sm mr-2 bg-[#7878FA]"></div>
        <div className="w-1/2 dark:text-[#D1D1D1] text-[#424286]">
          {coinAName}: {selectedCurrency.symbol}
          {coinPriceA}
        </div>
        <div className="w-6 h-6 rounded-sm mr-2 bg-[#9D62D9]"></div>
        <div className="w-1/2 dark:text-[#D1D1D1] text-[#424286]">
          {coinBName}: {selectedCurrency.symbol}
          {coinPriceB}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`rounded-xl flex flex-col justify-between p-6 w-632 h-full dark:text-[#7474f260] dark:bg-[#1b1932] bg-white`}
    >
      <div className="w-174 h-116 flex flex-col justify-between">
        <h3 className="w-160 h-6 dark:text-[#D1D1D1] text-[#191932] text-xl">
          Bitcoin (BTC)
        </h3>
        <div className="w-174 h-68  flex flex-col justify-between">
          <h2 className="dark:text-white text-[#181825] text-3xl font-bold">
            {selectedCurrency.symbol}
            {roundedPrice}
          </h2>
          <h3 className="dark:text-[#B9B9BA] text-[#424286]">{todaysDate}</h3>
        </div>
      </div>
      <div className="w-584 h-216">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

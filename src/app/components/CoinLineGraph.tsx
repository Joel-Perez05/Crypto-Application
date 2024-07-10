import React from "react";
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
import getCoinGradient from "../utils/CoinColorGradient";

type ChartDataType = {
  prices: number[];
  color: string;
  colorTwo: string;
};

const CoinLineGraph: React.FC<ChartDataType> = (props) => {
  ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip
  );

  const { prices, color, colorTwo } = props;

  const options = {
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
        min: 120,
        max: 180,
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

  const labels = prices.map((_, idx) => `D${(idx % 7) + 1}`);

  const data: ChartData<"line", number[], string> = {
    labels: labels,
    datasets: [
      {
        label: "price",
        data: prices.map((price) => price),
        tension: 0.1,
        borderColor: color,
        fill: false,
        pointStyle: false,
        borderWidth: 0.8,
      },
    ],
  };

  return (
    <div className="w-120 h-16">
      <div className="w-full h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CoinLineGraph;

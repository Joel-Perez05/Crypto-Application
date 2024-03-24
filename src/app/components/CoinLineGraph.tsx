"use client";
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

type ChartDataType = {
  chartData: ChartData<"line", number[], string>;
};

const CoinLineGraph: React.FC<ChartDataType> = (props) => {
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

  const lables = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];
  return (
    <div className="w-32">
      <Line data={props.chartData} options={options} />
    </div>
  );
};

export default CoinLineGraph;

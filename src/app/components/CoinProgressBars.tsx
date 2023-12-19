"use client";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

type ProgressBarType = {
  titleColor: string;
  titleCompleted: string;
  completed: number;
  completedColor: string;
  titleMaxColor: string;
  titleMaxCompleted: string;
  maxCompleted: number;
  maxCompletedColor: string;
};

const CoinProgressBars: React.FC<ProgressBarType> = (props) => {
  return (
    <div className="w-36">
      <span className="flex justify-around">
        <p className={props.titleColor}>{props.titleCompleted}</p>
        <p className={props.titleMaxColor}>{props.titleMaxCompleted}</p>
      </span>
      <span>
        <ProgressBar
          completed={props.completed}
          maxCompleted={props.maxCompleted}
          bgColor={props.completedColor}
          baseBgColor={props.maxCompletedColor}
          height="10px"
          width="80%"
          isLabelVisible={false}
          className="flex justify-center"
        />
      </span>
    </div>
  );
};

export default CoinProgressBars;

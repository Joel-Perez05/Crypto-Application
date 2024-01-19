"use client";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <BeatLoader color="#22c55e" speedMultiplier={1} size={30} />
    </div>
  );
};

export default LoadingSpinner;

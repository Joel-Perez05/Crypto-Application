"use client";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      className={`dark:bg-[#13121A] bg-[#f2f2fd] flex justify-center items-center h-screen w-full`}
    >
      <BeatLoader color="#22c55e" speedMultiplier={1} size={30} />
    </div>
  );
};

export default LoadingSpinner;

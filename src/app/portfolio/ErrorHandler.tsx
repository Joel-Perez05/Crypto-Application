"use client";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/redux/store";

type ErrorPropsType = {
  error: string | undefined;
};

const ErrorHandler: React.FC<ErrorPropsType> = (props) => {
  const { error } = props;

  useEffect(() => {
    if (error) {
      toast.error("To fetch data again, try refreshing!!!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [error]);

  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode);

  return (
    <div
      className={`${
        isDarkMode ? "bg-custom-dark2" : "bg-gray-300"
      } flex justify-center items-center h-screen w-full`}
    >
      <div className="text-red-500 text-3xl flex flex-col justify-center items-center">
        <h2 className="mb-4">
          Uh oh we're having some trouble fetching your data.
        </h2>
        <h2>{error}</h2>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ErrorHandler;

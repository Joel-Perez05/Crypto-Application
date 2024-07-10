"use client";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  return (
    <div
      className={`dark:bg-custom-dark bg-gray-300 flex justify-center items-center h-screen w-full`}
    >
      <div className="text-red-500 text-3xl flex flex-col justify-center items-center">
        <h2 className="mb-4">
          Uh oh we are having some trouble fetching your data.
        </h2>
        <h2>{error}</h2>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ErrorHandler;

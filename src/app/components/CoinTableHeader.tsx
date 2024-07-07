import React from "react";

const CoinTableHeader = () => {
  return (
    <div className="w-full h-50 flex justify-evenly items-center dark:text-[#D1D1D1] text-[#424286] text-sm">
      <p className="h-18 w-4">#</p>
      <p className="h-18 w-52">Name</p>
      <p className="h-18 w-20">Price</p>
      <p className="h-18 w-72">1h%</p>
      <p className="h-18 w-72">24h%</p>
      <p className="h-18 w-72">7d%</p>
      <p className="h-18 w-228">24h Volume / Market Cap</p>
      <p className="h-18 w-228">Circulating / Total supply</p>
      <p className="h-18 w-120">Last 7d</p>
    </div>
  );
};

export default CoinTableHeader;

import { sortCoins } from "@/redux/features/sort-Slice";
import { AppDispatch } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const sortOptions = [
  { name: "#", width: "w-4" },
  { name: "Name", width: "w-52" },
  { name: "Price", width: "w-20" },
  { name: "1h%", width: "w-72" },
  { name: "24h%", width: "w-72" },
  { name: "7d%", width: "w-72" },
];

const CoinTableHeader = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSort = (field: string) => {
    dispatch(sortCoins(field));
  };

  return (
    <div className="w-full h-50 flex justify-evenly items-center dark:text-[#D1D1D1] text-[#424286] text-sm">
      {sortOptions.map((sort) => {
        const sortId = `option-${sort.name}`;
        return (
          <div key={sortId}>
            <button
              onClick={() => handleSort(sort.name)}
              className={`h-18 ${sort.width} hover:font-semibold text-left`}
            >
              {sort.name}
            </button>
          </div>
        );
      })}
      <p className="h-18 w-228">24h Volume / Market Cap</p>
      <p className="h-18 w-228">Circulating / Total supply</p>
      <p className="h-18 w-120">Last 7d</p>
    </div>
  );
};

export default CoinTableHeader;

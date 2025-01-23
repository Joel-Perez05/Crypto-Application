"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { SearchBarNamesTypes } from "../utils/CoinPageTypes";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import classes from "../../styles/searchbar.module.css";

const SearchBar = () => {
  const [error, setError] = useState<string | undefined>();
  const [coinListData, setCoinListData] = useState([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [displayCount, setDisplayCount] = useState<number>(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinDataResponse = await axios.get(
          "/api/landingPage/getSearchBarData"
        );
        const coinNames = coinDataResponse.data.map(
          (coin: SearchBarNamesTypes) => {
            return {
              name: coin.name,
              id: coin.id,
            };
          }
        );
        setCoinListData(coinNames);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setDisplayCount((prevCount) => prevCount + 5);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredCoins = coinListData?.filter((coin: SearchBarNamesTypes) => {
    let coinName = coin.name;
    return coinName.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div className="flex items-center w-356 h-48 relative">
      <div className="relative h-full w-full">
        <input
          onChange={handleSearch}
          placeholder="Search..."
          className={`dark:bg-[#191925] dark:text-white bg-[#ccccfa63] text-[#424286] rounded-md pl-10 pr-4 h-full border w-full border-white dark:border-[#212140] focus:outline-none`}
          type="text"
        />
        <MagnifyingGlassIcon
          className={`dark:text-[#D1D1D6] text-[#424286] absolute left-3 top-3.5 w-5 h-5 pointer-events-none`}
        />

        {searchInput.trim() !== "" && error ? (
          <div
            className={`dark:bg-[#191925] bg-white p-4 w-full rounded-md text-red-500 absolute top-11 left-0 z-50`}
          >
            API: {error}
          </div>
        ) : (
          searchInput.trim() !== "" &&
          !error && (
            <div
              className={`dark:bg-[#191925] dark:text-white rounded-md bg-white text-[#424286] w-full  absolute top-11 left-0 z-50`}
            >
              <InfiniteScroll
                dataLength={displayCount}
                next={handleNext}
                hasMore={displayCount < 50}
                loader={<h4>Loading...</h4>}
                height={300}
                className={classes.customInfiniteScroll}
              >
                {filteredCoins.map((coin: SearchBarNamesTypes) => (
                  <div key={coin.id} className="p-4 border-b border-gray-600">
                    <Link
                      onClick={() => setSearchInput("")}
                      href={`/coin/${coin.id}`}
                    >
                      {coin.name}
                    </Link>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;

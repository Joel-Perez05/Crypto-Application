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
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
        );
        const coinNames = coinDataResponse.data.map(
          (coin: SearchBarNamesTypes) => coin.name
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

  const filteredCoins = coinListData.filter((coin: string) =>
    coin.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex items-center relative">
      <div className="relative">
        <input
          onChange={handleSearch}
          placeholder="Search..."
          className="bg-custom-dark1 rounded-md text-white pl-10 pr-4 h-11 border border-[#212140] focus:outline-none"
          type="text"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500 pointer-events-none" />

        {error && <div className="text-red-500">{error}</div>}
        {searchInput.trim() !== "" && !error && (
          <div className="bg-custom-dark1 w-full text-white absolute top-11 left-0 z-50">
            <InfiniteScroll
              dataLength={displayCount}
              next={handleNext}
              hasMore={displayCount < 50}
              loader={<h4>Loading...</h4>}
              height={300}
              className={classes.customInfiniteScroll}
            >
              {filteredCoins.map((coin: string) => (
                <div key={coin} className="p-4 border-b border-gray-600">
                  <Link
                    onClick={() => setSearchInput("")}
                    href={`/coin/${coin.toLowerCase()}`}
                  >
                    {coin}
                  </Link>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

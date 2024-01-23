"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import FormToggler from "../components/FormToggler";

const Portfolio = () => {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [coinData, setCoinData] = useState();
  const [formToggler, setFormToggler] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinDataResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
        );
        setCoinData(coinDataResponse.data);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="h-full md:w-full xl:w-1/2 p-4 bg-custom-dark1">
          <div>
            <FormToggler
              formToggler={formToggler}
              setFormToggler={setFormToggler}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;

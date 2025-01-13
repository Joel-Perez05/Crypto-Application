import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 250,
          page: 1,
          sparkline: true,
          price_change_percentage: "1h,24h,7d",
        },
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Error fetching Search Bar Coin Data",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

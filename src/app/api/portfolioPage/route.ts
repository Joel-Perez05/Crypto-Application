import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("vs_currency") || "usd";

  try {
    const portfolioDataRes = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
        },
      }
    );

    return NextResponse.json(portfolioDataRes.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch portfolio data",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("vs_currency") || "usd";
  const perPage = searchParams.get("per_page") || "50";

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: perPage,
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
        error: "Failed to fetch coin table data",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coinName = searchParams.get("coin");

  try {
    const coinDataRes = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
        },
      }
    );

    return NextResponse.json(coinDataRes.data);
  } catch (error: any) {
    console.error("Error Fetching Individual Coin Data", error.message);
    return NextResponse.json(
      { errorr: "Failed To Fetch Coin Data", details: error.message },
      { status: 500 }
    );
  }
}

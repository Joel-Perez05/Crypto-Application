import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("vs_currency") || "usd";
  const coin = searchParams.get("coinName") || "bitcoin";

  try {
    const priceAndVolRes = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}&include_24hr_vol=true&precision=2`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
        },
      }
    );

    return NextResponse.json(priceAndVolRes.data);
  } catch (error: any) {
    console.error("Error Fetching Daily Coin Data", error.message);
    return NextResponse.json(
      { errorr: "Failed To Fetch Coin Daily Data", details: error.message },
      { status: 500 }
    );
  }
}

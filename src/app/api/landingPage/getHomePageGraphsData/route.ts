import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("vs_currency") || "usd";

  try {
    const chartsDataRes = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=365&interval=daily`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
        },
      }
    );

    return NextResponse.json(chartsDataRes.data);
  } catch (error: any) {
    console.error("Error Fetching HomePage Graph Data", error.message);
    return NextResponse.json(
      { errorr: "Failed To Fetch Graph Data", details: error.message },
      { status: 500 }
    );
  }
}

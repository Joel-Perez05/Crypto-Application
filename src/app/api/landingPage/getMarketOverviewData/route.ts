import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/global",
      {
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
        error: "Error fetching Overview Market Data",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

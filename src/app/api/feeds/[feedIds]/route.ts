import { api } from "@/lib/chainlink-sdk";
import { NextResponse } from "next/server";
import { getUnixTime } from "date-fns";
import { formatUnits } from "viem";

export async function GET(
  request: Request,
  { params }: { params: { feedIds: string } },
) {
  const { feedIds } = params;
  const feeds = feedIds.split(",");
  const timestamp = getUnixTime(new Date());
  try {
    const report = await api.fetchFeeds({
      timestamp,
      feeds,
    });
    const data = Object.keys(report).map((feedId) => ({
      feedId,
      timestamp: Number(report[feedId].observationsTimestamp),
      price: formatUnits(report[feedId].benchmarkPrice, 8),
    }));
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json([]);
  }
}

import { api } from "@/lib/chainlink-sdk";
import { NextResponse } from "next/server";
import { getUnixTime } from "date-fns";
import { formatUnits } from "viem";

export async function GET(
  request: Request,
  { params }: { params: { feedId: string } },
) {
  const { feedId } = params;
  const timestamp = getUnixTime(new Date());
  try {
    const report = await api.fetchFeed({
      timestamp,
      feed: feedId,
    });
    return NextResponse.json([
      {
        feedId,
        timestamp: Number(report.observationsTimestamp),
        price: formatUnits(report.benchmarkPrice, 8),
      },
    ]);
  } catch (error: any) {
    return NextResponse.json([]);
  }
}

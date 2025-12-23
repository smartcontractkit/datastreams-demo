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
    const reports = await api.fetchFeeds({
      timestamp,
      feeds,
    });
    const data = Object.keys(reports).map((feedId) => ({
      feedId,
      timestamp: Number(reports[feedId].observationsTimestamp),
      price: formatUnits(
        reports[feedId].version === "v4"
          ? // ternary doesn't narrow type correctly hence the 'as any' cast
            (reports[feedId] as any).price
          : (reports[feedId] as any).benchmarkPrice,
        8,
      ),
    }));
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json([]);
  }
}

"use client";

import { Pair } from "@/_types";
import { useDatafeed } from "@/app/datafeed-provider";

const DatafeedData = ({
  data,
  pair,
}: {
  data: "price" | "date";
  pair: Pair;
}) => {
  const { prices, dates } = useDatafeed();

  if (data === "price") {
    return <span className="w-[60px]">{prices[pair] ? '$' : ''}{prices[pair]}</span>;
  }
  if (data === "date") {
    return <span className="w-[60px]">{dates[pair]}</span>;
  }
};

export default DatafeedData;

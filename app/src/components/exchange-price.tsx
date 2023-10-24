"use client";

import { ExchangePlatform, Pair } from "@/_types";
import { useSocket } from "@/app/socket-provider";

const ExchangePrice = ({
  source,
  pair,
}: {
  source: ExchangePlatform;
  pair: Pair;
}) => {
  const { prices } = useSocket();
  return <span className="w-[60px]">{prices[source][pair] ? '$' : ''}{prices[source][pair]}</span>;
};

export default ExchangePrice;

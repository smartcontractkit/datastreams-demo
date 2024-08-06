// TODO: find more suitable wording for this enum
export enum ExchangePlatform {
  BINANCE = "BINANCE",
  COINBASE = "COINBASE",
}

export enum Pair {
  ETH_USD = "ETH-USD",
  AVAX_USD = "AVAX-USD",
}

export const binancePairs = {
  [Pair.ETH_USD]: "ETHUSDT",
  [Pair.AVAX_USD]: "AVAXUSDT",
};

export const chainlinkPairToFeedId = {
  [Pair.ETH_USD]:
    "0x000359843a543ee2fe414dc14c7e7920ef10f4372990b79d6361cdc0dd1ba782",
  [Pair.AVAX_USD]:
    "0x0003735a076086936550bd316b18e5e27fc4f280ee5b6530ce68f5aad404c796",
};

export type PriceResponse = {
  feedId: string;
  observationTimestamp: number;
  benchmarkPrice: string;
};

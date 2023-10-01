// TODO: find more suitable wording for this enum
export enum ExchangePlatform {
  BINANCE = "BINANCE",
  COINBASE = "COINBASE",
}

export enum Pair {
  ETH_USD = "ETH-USD",
  LINK_USD = "LINK-USD",
}

export const binancePairs = {
  [Pair.ETH_USD]: "ETHUSDT",
  [Pair.LINK_USD]: "LINKUSDT",
};

export const chainlinkPairToFeedId = {
  [Pair.ETH_USD]:
    "0x00023496426b520583ae20a66d80484e0fc18544866a5b0bfee15ec771963274",
  [Pair.LINK_USD]:
    "0x0002f18a75a7750194a6476c9ab6d51276952471bd90404904211a9d47f34e64",
};

export type PriceResponse = {
  feedId: string;
  observationTimestamp: number;
  benchmarkPrice: string;
};

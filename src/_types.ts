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
    "0x00029584363bcf642315133c335b3646513c20f049602fc7d933be0d3f6360d3",
  [Pair.LINK_USD]:
    "0x0002191c50b7bdaf2cb8672453141946eea123f8baeaa8d2afa4194b6955e683",
};

export type PriceResponse = {
  feedId: string;
  observationTimestamp: number;
  benchmarkPrice: string;
};

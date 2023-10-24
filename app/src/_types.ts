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
    "0x00029584363bcf642315133c335b3646513c20f049602fc7d933be0d3f6360d3",
  [Pair.AVAX_USD]:
    "0x0002c407f448ffe50a15fd5f1ffe4791830c5f8fa39cd971a3d6ae337aef51a0",
};

export type PriceResponse = {
  feedId: string;
  observationTimestamp: number;
  benchmarkPrice: string;
};

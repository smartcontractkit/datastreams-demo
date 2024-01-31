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
    "0x00027bbaff688c906a3e20a34fe951715d1018d262a5b66e38eda027a674cd1b",
  [Pair.AVAX_USD]:
    "0x00021c125c52db1459181038e065de71e67ec57f45f5da7d3197758a57b6ed20",
};

export type PriceResponse = {
  feedId: string;
  observationTimestamp: number;
  benchmarkPrice: string;
};

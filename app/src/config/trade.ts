export const isTradeEnabled =
  typeof process.env.ENABLE_TRADE == undefined || process.env.ENABLE_TRADE == ""
    ? false
    : process.env.ENABLE_TRADE === "true";

export const symbols: { [key: string]: string } = {
  USDC: "/usdc.svg",
  ETH: "/ethereum.svg",
  WETH: "/ethereum.svg",
  AVAX: "/avax.svg",
};

export const isTradeEnabled =
  typeof process.env.ENABLE_TRADE == undefined || process.env.ENABLE_TRADE == ""
    ? false
    : process.env.ENABLE_TRADE === "true";

export const usdcAddress = "0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63";
export const linkAddress = "0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28";

export const symbols: { [key: string]: string } = {
  USDC: "/usdc.svg",
  ETH: "/ethereum.svg",
  LINK: "/link.svg",
};

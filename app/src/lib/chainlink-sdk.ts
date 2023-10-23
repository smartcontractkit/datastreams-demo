import ChainlinkLowLatencySDK from "@hackbg/lolsdk";

export const api = new ChainlinkLowLatencySDK({
  hostname: process.env.CHAINLINK_API_URL!,
  wsHostname: process.env.CHAINLINK_WEBSOCKET_URL!,
  clientID: process.env.CHAINLINK_CLIENT_ID!,
  clientSecret: process.env.CHAINLINK_CLIENT_SECRET!,
});

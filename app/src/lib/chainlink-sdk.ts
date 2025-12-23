import ChainlinkLowLatencySDK from "@hackbg/chainlink-datastreams-consumer";

export const api = new ChainlinkLowLatencySDK({
  apiUrl: process.env.CHAINLINK_API_URL!,
  wsUrl: process.env.CHAINLINK_WEBSOCKET_URL!,
  clientId: process.env.CHAINLINK_CLIENT_ID!,
  clientSecret: process.env.CHAINLINK_CLIENT_SECRET!,
});

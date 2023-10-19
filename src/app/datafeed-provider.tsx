"use client";

import { Pair, chainlinkPairToFeedId } from "@/_types";
import { format, fromUnixTime } from "date-fns";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

type DatafeedContextType = {
  prices: {
    [Pair.ETH_USD]: string;
    [Pair.LINK_USD]: string;
  };
  dates: {
    [Pair.ETH_USD]: string;
    [Pair.LINK_USD]: string;
  };
};

const DatafeedContext = createContext<DatafeedContextType>({
  prices: {
    [Pair.ETH_USD]: "",
    [Pair.LINK_USD]: "",
  },
  dates: { [Pair.ETH_USD]: "", [Pair.LINK_USD]: "" },
});

export const useDatafeed = () => {
  return useContext(DatafeedContext);
};

export const DatafeedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ethUsdPrice, setEthUsdPrice] = useState("");
  const [linkUsdPrice, setLinkUsdPrice] = useState("");
  const [ethUsdDate, setEthUsdDate] = useState(
    format(new Date(), "MMM dd, y, HH:mm O"),
  );
  const [linkUsdDate, setLinkUsdDate] = useState(
    format(new Date(), "MMM dd, y, HH:mm O"),
  );

  const { data: ethData } = useSWR<
    {
      feedId: string;
      timestamp: number;
      price: string;
    }[]
  >(
    `/api/feed/${chainlinkPairToFeedId[Pair.ETH_USD]}
    `,
    fetcher,
    { refreshInterval: 1000 },
  );

  useEffect(() => {
    if (ethData) {
      const ethUsd = ethData.find(
        (entry) => entry.feedId === chainlinkPairToFeedId[Pair.ETH_USD],
      );
      if (ethUsd) {
        setEthUsdPrice((Number(ethUsd.price) / 10 ** 10).toFixed(2));
        setEthUsdDate(
          format(fromUnixTime(ethUsd.timestamp), "MMM dd, y, HH:mm O"),
        );
      }
    }
  }, [ethData]);

  const { data: linkData } = useSWR<
    {
      feedId: string;
      timestamp: number;
      price: string;
    }[]
  >(
    `/api/feed/${chainlinkPairToFeedId[Pair.LINK_USD]}
    `,
    fetcher,
    { refreshInterval: 1000 },
  );

  useEffect(() => {
    if (linkData) {
      const linkUsd = linkData.find(
        (entry) => entry.feedId === chainlinkPairToFeedId[Pair.LINK_USD],
      );
      if (linkUsd) {
        setLinkUsdPrice((Number(linkUsd.price) / 10 ** 10).toFixed(2));
        setLinkUsdDate(
          format(fromUnixTime(linkUsd.timestamp), "MMM dd, y, HH:mm O"),
        );
      }
    }
  }, [linkData]);

  return (
    <DatafeedContext.Provider
      value={{
        prices: { [Pair.ETH_USD]: ethUsdPrice, [Pair.LINK_USD]: linkUsdPrice },
        dates: {
          [Pair.ETH_USD]: ethUsdDate,
          [Pair.LINK_USD]: linkUsdDate,
        },
      }}
    >
      {children}
    </DatafeedContext.Provider>
  );
};

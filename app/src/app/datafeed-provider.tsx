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
    [Pair.AVAX_USD]: string;
  };
  dates: {
    [Pair.ETH_USD]: string;
    [Pair.AVAX_USD]: string;
  };
};

const DatafeedContext = createContext<DatafeedContextType>({
  prices: {
    [Pair.ETH_USD]: "",
    [Pair.AVAX_USD]: "",
  },
  dates: { [Pair.ETH_USD]: "", [Pair.AVAX_USD]: "" },
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
  const [avaxUsdPrice, setAvaxUsdPrice] = useState("");
  const [ethUsdDate, setEthUsdDate] = useState(
    format(new Date(), "MMM dd, y, HH:mm O"),
  );
  const [avaxUsdDate, setAvaxUsdDate] = useState(
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

  const { data: avaxData } = useSWR<
    {
      feedId: string;
      timestamp: number;
      price: string;
    }[]
  >(
    `/api/feed/${chainlinkPairToFeedId[Pair.AVAX_USD]}
    `,
    fetcher,
    { refreshInterval: 1000 },
  );

  useEffect(() => {
    if (avaxData) {
      const avaxUsd = avaxData.find(
        (entry) => entry.feedId === chainlinkPairToFeedId[Pair.AVAX_USD],
      );
      if (avaxUsd) {
        setAvaxUsdPrice((Number(avaxUsd.price) / 10 ** 10).toFixed(2));
        setAvaxUsdDate(
          format(fromUnixTime(avaxUsd.timestamp), "MMM dd, y, HH:mm O"),
        );
      }
    }
  }, [avaxData]);

  return (
    <DatafeedContext.Provider
      value={{
        prices: { [Pair.ETH_USD]: ethUsdPrice, [Pair.AVAX_USD]: avaxUsdPrice },
        dates: {
          [Pair.ETH_USD]: ethUsdDate,
          [Pair.AVAX_USD]: avaxUsdDate,
        },
      }}
    >
      {children}
    </DatafeedContext.Provider>
  );
};

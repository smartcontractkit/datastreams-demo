import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TradeButton } from "@/components/trade-button";
import ExchangePrice from "@/components/exchange-price";
import { ExchangePlatform, Pair } from "@/_types";
import DatafeedData from "@/components/datafeed-data";
import { isTradeEnabled } from "@/config/trade";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="mb-6 mt-12 space-y-6">
      <h2 className="hidden text-[40px] font-medium leading-[52px] tracking-[-0.8px] md:block">
        Chainlink Data Streams Demo dApp
      </h2>
      <p className="hidden font-[450] text-muted-foreground md:block">
        Low-latency, high frequency, gas efficient data feeds on Arbitrum Goerli
        Testnet.
      </p>
      <div className="rounded-md border bg-[rgb(24,29,41)]/60 p-6">
        <Table className="border-separate border-spacing-y-4">
          <TableHeader className="[&_tr]:border-b-0">
            <TableRow className="hover:bg-[rgb(24,29,41)]/60 data-[state=selected]:bg-[rgb(24,29,41)]/60">
              <TableHead className="flex items-center space-x-1 text-xl font-medium text-foreground">
                <span>Feed</span>
                <Image src="/sort.svg" width={13} height={13} alt="sort" />
              </TableHead>
              <TableHead className="text-xl font-medium text-foreground">
                Network
              </TableHead>
              <TableHead className="text-xl font-medium text-foreground">
                Answer
              </TableHead>
              <TableHead className="text-xl font-medium text-foreground">
                Last Update
              </TableHead>
              <TableHead className="w-[300px] text-xl font-medium text-foreground">
                Cex Comparison
              </TableHead>
              {isTradeEnabled && (
                <TableHead className="text-right text-xl font-medium text-foreground"></TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="text-base font-medium leading-4">
            <TableRow className="rounded-md bg-[rgb(43,49,60)]/40">
              <TableCell className="rounded-l-md">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/ethereum.svg"
                    alt="ethereum"
                    width={16}
                    height={16}
                  />
                  <span> ETH/USD</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/arbitrum.svg"
                    alt="arbitrum"
                    width={16}
                    height={16}
                  />
                  <span>Arbitrum Goerli</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <DatafeedData data="price" pair={Pair.ETH_USD} />
                </div>
              </TableCell>
              <TableCell>
                <DatafeedData data="date" pair={Pair.ETH_USD} />
              </TableCell>
              <TableCell
                width={210}
                className={cn(isTradeEnabled ? "" : "rounded-r-md")}
              >
                <div className="grid w-[210px] grid-cols-2 items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/binance.svg"
                      alt="binance"
                      width={16}
                      height={16}
                    />
                    <ExchangePrice
                      source={ExchangePlatform.BINANCE}
                      pair={Pair.ETH_USD}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/coinbase.svg"
                      alt="coinbase"
                      width={16}
                      height={16}
                    />
                    <ExchangePrice
                      source={ExchangePlatform.COINBASE}
                      pair={Pair.ETH_USD}
                    />
                  </div>
                </div>
              </TableCell>
              {isTradeEnabled && (
                <TableCell className="rounded-r-md text-right">
                  <TradeButton pair={Pair.ETH_USD} />
                </TableCell>
              )}
            </TableRow>
            <TableRow className="rounded-md bg-[rgb(43,49,60)]/40">
              <TableCell className="rounded-l-md">
                <div className="flex items-center space-x-2">
                  <Image src="/link.svg" alt="arb" width={16} height={16} />
                  <span>LINK/USD</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/arbitrum.svg"
                    alt="arbitrum"
                    width={16}
                    height={16}
                  />
                  <span>Arbitrum Goerli</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <DatafeedData data="price" pair={Pair.LINK_USD} />
                </div>
              </TableCell>
              <TableCell>
                <DatafeedData data="date" pair={Pair.LINK_USD} />
              </TableCell>
              <TableCell
                width={210}
                className={cn(isTradeEnabled ? "" : "rounded-r-md")}
              >
                <div className="grid w-[210px] grid-cols-2 items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/binance.svg"
                      alt="binance"
                      width={16}
                      height={16}
                    />
                    <ExchangePrice
                      source={ExchangePlatform.BINANCE}
                      pair={Pair.LINK_USD}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/coinbase.svg"
                      alt="coinbase"
                      width={16}
                      height={16}
                    />
                    <ExchangePrice
                      source={ExchangePlatform.COINBASE}
                      pair={Pair.LINK_USD}
                    />
                  </div>
                </div>
              </TableCell>
              {isTradeEnabled && (
                <TableCell className="rounded-r-md text-right"></TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

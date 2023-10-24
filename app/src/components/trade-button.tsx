"use client";

import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import TradeDialog from "@/components/trade-dialog";

import { Pair } from "@/_types";
import { useDatafeed } from "@/app/datafeed-provider";

export const TradeButton = ({ pair }: { pair: Pair }) => {
  const { isConnected } = useAccount();
  const { prices } = useDatafeed();

  return (
    <Dialog>
      {isConnected ? (
        <DialogTrigger asChild>
          <Button
            disabled={!prices[pair]}
            className="w-[156px] bg-[#375BD2] py-3 text-base font-black leading-4 hover:bg-[#375BD2]/90"
          >
            Trade
          </Button>
        </DialogTrigger>
      ) : (
        <Button
          className="w-[156px] bg-[#375BD2] py-3 text-base font-black leading-4 hover:bg-[#375BD2]/90"
          onClick={() =>
            toast({
              title: "Connect wallet:",
              description: "To place a trade, please connect",
            })
          }
        >
          Trade
        </Button>
      )}
      <DialogContent className="max-w-[400px] bg-[#181D29] pt-8 sm:max-w-[400px]">
        <TradeDialog pair={pair} />
      </DialogContent>
    </Dialog>
  );
};

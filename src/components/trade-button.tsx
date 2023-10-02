"use client";

import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount, useBalance } from "wagmi";
import { parseUnits } from "viem";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel } from "@/components//ui/form";
import { Pair } from "@/_types";
import { linkAddress, symbols, usdcAddress } from "@/config/trade";

const formSchema = z.object({
  from: z.coerce.number().gt(0),
  to: z.coerce.number().gt(0),
});

export const TradeButton = ({ pair }: { pair: Pair }) => {
  const { isConnected, address } = useAccount();

  const tokenA = usdcAddress;
  const tokenB = pair === Pair.LINK_USD ? linkAddress : undefined;

  const { data: tokenABalance } = useBalance({ address, token: tokenA });
  const { data: tokenBBalance } = useBalance({ address, token: tokenB });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: 0,
      to: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const amountA = parseUnits(`${values.from}`, tokenABalance?.decimals ?? 0);
    const amountB = parseUnits(`${values.to}`, tokenBBalance?.decimals ?? 0);
    if (amountA > (tokenABalance?.value ?? BigInt(0))) {
      toast({
        title: "Error:",
        description: "Insufficient Balance",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Swap completed:",
      description: `${values.from} ${tokenABalance?.symbol} for ${values.to} ${tokenBBalance?.symbol}`,
      variant: "success",
    });
  }

  return (
    <Dialog>
      {isConnected ? (
        <DialogTrigger asChild>
          <Button className="w-[156px] bg-[#375BD2] py-3 text-base font-black leading-4 hover:bg-[#375BD2]/90">
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid w-full grid-cols-2">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-[450] leading-4">
                      From
                    </FormLabel>
                    <Input
                      type="number"
                      className="rounded-none border-0 p-0 text-[40px] font-medium leading-[52px] -tracking-[0.8px] [appearance:textfield] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-end space-y-4">
                <Label className="text-base font-[450] leading-4 text-muted-foreground">
                  Balance:&nbsp;
                  <span className="text-foreground">
                    {tokenABalance?.formatted}
                  </span>
                </Label>
                <div className="flex items-center space-x-2 rounded-md bg-muted px-4 py-2">
                  {tokenABalance?.symbol && (
                    <Image
                      src={symbols[tokenABalance?.symbol]}
                      height={24}
                      width={24}
                      alt={tokenABalance.symbol}
                    />
                  )}
                  <span className="text-base font-[450] leading-4">
                    {tokenABalance?.symbol}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center space-x-6">
              <div className="h-[1px] flex-1 bg-border" />
              <Image
                src="/sync-arrows.svg"
                height={16}
                width={16}
                alt="arrows"
              />
              <div className="h-[1px] flex-1 bg-border" />
            </div>
            <div className="grid w-full grid-cols-2">
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-[450] leading-4">
                      To
                    </FormLabel>
                    <Input
                      type="number"
                      className="rounded-none border-0 p-0 text-[40px] font-medium leading-[52px] -tracking-[0.8px] [appearance:textfield] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-end space-y-4">
                <Label className="text-base font-[450] leading-4 text-muted-foreground">
                  Balance:&nbsp;
                  <span className="text-foreground">
                    {tokenBBalance?.formatted}
                  </span>
                </Label>
                <div className="flex items-center space-x-2 rounded-md bg-muted px-4 py-2">
                  {tokenBBalance?.symbol && (
                    <Image
                      src={symbols[tokenBBalance?.symbol]}
                      height={24}
                      width={24}
                      alt={tokenBBalance.symbol}
                    />
                  )}
                  <span className="text-base font-[450] leading-4">
                    {tokenBBalance?.symbol}
                  </span>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="mt-6 w-full bg-[#375BD2] text-base font-black leading-4 text-foreground hover:bg-[#375BD2]/90"
            >
              Swap
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button className="w-full border-2 border-border bg-background text-base font-medium leading-4 text-foreground hover:bg-background/90 hover:text-muted-foreground">
              Cancel
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

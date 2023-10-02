import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import Image from "next/image";
import { Figtree } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import { ConnectWallet } from "@/components/connect-wallet";
import Link from "next/link";
import { SocketProvider } from "./socket-provider";
import { DatafeedProvider } from "./datafeed-provider";
import { Toaster } from "@/components/ui/toaster";
import GoogleTag from "@/components/google-tag";
import MobileConnectWallet from "@/components/mobile-connect-wallet";
import { isTradeEnabled } from "@/config/trade";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background bg-[url('/honeycomb.svg')] bg-left-bottom bg-no-repeat",
          figtree.className,
        )}
      >
        <DatafeedProvider>
          <SocketProvider>
            <Providers>
              <div className="flex flex-col items-center justify-center border-b bg-accent">
                <header className="container flex max-w-[1440px] flex-row items-center justify-between px-6 py-5 md:px-16">
                  <div className="flex flex-row items-center space-x-4">
                    <Image src="/logo.svg" height={32} width={32} alt="logo" />
                    <h1 className="hidden font-medium leading-7 md:inline-block">
                      Chainlink | Data Streams Demo
                    </h1>
                    <h1 className="font-medium leading-7 md:hidden">
                      Data Streams Demo
                    </h1>
                  </div>
                  {isTradeEnabled && (
                    <>
                      <div className="hidden md:inline-block">
                        <ConnectWallet />
                      </div>
                      <div className="md:hidden">
                        <MobileConnectWallet />
                      </div>
                    </>
                  )}
                </header>
              </div>
              <div className="flex flex-col items-center justify-center bg-[#021642] p-5">
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <div className="rounded-[2px] bg-[#375BD2] px-1">NEW</div>
                  <div>
                  Data Streams is now available in mainnet early access for developers.&nbsp;
                    <a
                      href="https://chainlinkcommunity.typeform.com/datastreams?ref_id=demoapp"
                      target="_blank"
                      rel="noreferrer hover:brightness-125"
                      className="underline"
                    >
                      Sign-up for early access today.
                    </a>
                  </div>
                </div>
              </div>
              <div className="container max-w-[1440px] bg-[url('/honeycomb.svg')] bg-right-top bg-no-repeat px-6 md:px-16">
                <Toaster />
                <main>{children}</main>
                <footer className="mb-4 mt-6 rounded-md border bg-[rgb(24,29,41)]/60 p-10 md:mb-16">
                  <div
                    className={cn(
                      "space-y-6 md:grid md:space-y-0",
                      isTradeEnabled ? "md:grid-cols-3" : "md:grid-cols-2",
                    )}
                  >
                    <div
                      className={cn(
                        "pb-10 md:pb-0 md:pr-10",
                        isTradeEnabled
                          ? ""
                          : "border-b md:border-b-0 md:border-r",
                      )}
                    >
                      <h3 className="mb-6 text-xl font-medium">Purpose</h3>
                      <p className="text-base font-[450] text-muted-foreground">
                        This dApp will show you how to use Chainlink Data
                        Streams to use low-latency data feeds in your dApp.
                      </p>
                    </div>
                    {isTradeEnabled && (
                      <div className="border-y py-10 md:border-x md:border-y-0 md:px-10 md:py-0">
                        <h3 className="mb-6 text-xl font-medium">
                          Getting started
                        </h3>
                        <div className="space-y-4 text-base font-[450] text-muted-foreground">
                          <p className="flex space-x-2">
                            <span>1. Connect your wallet</span>
                            <span className="flex space-x-2 rounded bg-muted px-2 py-1">
                              <Image
                                src="/metamask.svg"
                                width={16}
                                height={16}
                                alt="metamask"
                              />
                              <Image
                                src="/walletconnect.svg"
                                width={16}
                                height={16}
                                alt="walletconnect"
                              />
                            </span>
                          </p>
                          <p>2. Select a token pair to trade</p>
                          <p>3. Swap the amount of tokens desired</p>
                        </div>
                      </div>
                    )}
                    <div className="md:pl-10">
                      <h3 className="mb-6 text-xl font-medium">
                        For Developers
                      </h3>
                      <p className="text-base font-[450] text-muted-foreground">
                        This dApp is built using Chainlink Data Streams. It
                        enables developers to use low-latency data feeds in
                        their smart contracts. Learn how to build a full-stack
                        dApp with Chainlink Data Streams.
                      </p>
                      <a
                        href="https://github.com/smartcontractkit/datastreams-demo"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex items-center space-x-[8px] text-base font-bold leading-4 underline hover:brightness-125"
                      >
                        <Image
                          src="/github.svg"
                          width={16}
                          height={16}
                          alt="github"
                        />
                        <span className="text-sm font-bold leading-4 text-white">
                          Go to Repository
                        </span>
                        <Image
                          src="/external-link.svg"
                          width={12}
                          height={12}
                          alt="external-link"
                        />
                      </a>
                    </div>
                  </div>
                </footer>
              </div>
            </Providers>
          </SocketProvider>
        </DatafeedProvider>
        <GoogleTag />
      </body>
    </html>
  );
}

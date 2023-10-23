"use client";

import Image from "next/image";
import blockies from "ethereum-blockies";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";

export const ConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    className="w-full space-x-2 bg-[#375BD2] px-10 py-3 text-base font-black leading-4 text-foreground hover:bg-[#375BD2]/90"
                  >
                    <span>Connect Wallet</span>
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    className="w-full space-x-2 border border-border px-10 py-3 text-base font-black leading-4 text-foreground"
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                  <Button
                    onClick={openChainModal}
                    className="space-x-2  border border-border px-4 py-3 text-sm font-medium leading-4 text-foreground"
                  >
                    {chain.iconUrl && (
                      <Image
                        src={chain.iconUrl}
                        width={18}
                        height={18}
                        alt={chain.name ?? "Chain icon"}
                      />
                    )}
                    <span>{chain.name}</span>
                    <Image
                      src="/caret.svg"
                      width={18}
                      height={18}
                      alt="caret"
                    />
                  </Button>
                  <Button
                    onClick={openAccountModal}
                    className="space-x-2  border border-border px-4 py-3 text-sm font-medium leading-4 text-foreground"
                  >
                    <span>
                      {account.ensName ? account.ensName : account.displayName}
                    </span>
                    {account.ensAvatar ? (
                      <Image
                        src={account.ensAvatar}
                        width={18}
                        height={18}
                        alt="blockie"
                        className="rounded"
                      />
                    ) : (
                      <Image
                        src={blockies
                          .create({ seed: account.address })
                          .toDataURL()}
                        width={18}
                        height={18}
                        alt="blockie"
                        className="rounded"
                      />
                    )}
                    <Image
                      src="/caret.svg"
                      width={18}
                      height={18}
                      alt="caret"
                    />
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

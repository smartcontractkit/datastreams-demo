# Chainlink Data Streams Demo dApp

> **Note**
>
> _This demo represents an educational example to use a Chainlink system, product, or service and is provided to demonstrate how to interact with Chainlink’s systems, products, and services to integrate them into your own. This template is provided “AS IS” and “AS AVAILABLE” without warranties of any kind, it has not been audited, and it may be missing key checks or error handling to make the usage of the system, product or service more clear. Do not use the code in this example in a production environment without completing your own audits and application of best practices. Neither Chainlink Labs, the Chainlink Foundation, nor Chainlink node operators are responsible for unintended outputs that are generated due to errors in code._

This project demonstrates how to use Chainlink Data Streams - part of Chainlink’s family of low-latency, hybrid price feed solutions in a full-stack implementation.

## Architecture overview

![Architecture Overview](/img/arch-overview.png)

## Frontend

`./app` directory is a Next.js project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

It contains the frontend for the data feeds demo dApp.

## Quick Start

Install all dependencies:

```bash
cd app
npm install
```

Set environment variables by copying `.env.example` to `.env` and filling in the values:

-   _NEXT_PUBLIC_ALCHEMY_API_KEY_ for the network you want to use. You can get one from [Alchemy](https://www.alchemy.com/).
-   _NEXT_PUBLIC_WALLET_CONNECT_ID_ for the wallet connector. You can get one from [WalletConnect](https://walletconnect.org/).

For connecting to Chainlink's Low Latency feeds you need to also fill in the following `.env` variables:

-   _CHAINLINK_CLIENT_ID_ - The ID is provided to you by Chainlink.
-   _CHAINLINK_CLIENT_SECRET_ - The secret is provided to you by Chainlink.
-   _CHAINLINK_API_URL_ api url for consuming the feeds via REST. No `http/https` prefixes should be used. Example: `api.chain.link`
-   _CHAINLINK_WEBSOCKET_URL_ optional for consuming feeds via websocket. No `http/https` prefixes should be used. Example: `ws.chain.link`

You can get those from your Chainlink platform coordinator.

Run `npm run dev` in your terminal, and then open [localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

-   [Next.js](https://nextjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [RainbowKit](https://www.rainbowkit.com/)
-   [wagmi](https://wagmi.sh/) & [viem](https://viem.sh/)
-   [shadcn/ui](https://ui.shadcn.com/)

## Backend

`./contracts` folder is a project that utlizes the low latency on-chain data streams functionality that Chainlink presents. This is used by the `DataStreamsConsumer.sol` contract to trade two ERC20 tokens on UniSwap. The purpose of this is to prevent front-running and automate trade execution. This repository uses the Hardhat environment for development and testing.

## Project Details

-   This contract uses Chainlink Automation Log Trigger to require data. This log trigger comes from the `DataStreamsConsumer.sol` contract by the user when he executes the `trade` function which itself emits the `InitiateTrade` event.

-   This event will make the Decentralized Oracle Network call the `checkLog` function which will therefore trigger the `StreamsLookup` error. After that you can model the reports as you wish in the `checkCallback` function.

-   After that Chainlink Data Streams Engine will send the data to your `performUpkeep` function. The data will include a signed report that will be verified in the `performUpkeep` function and the extraData that has been sent which in our contract is the parameters of the `InitiateTrade` event i.e the recipient, the address of the token sent, the address of the token that you will recieve of and the amount that you are going to be sending. The amount that you will receive is calculated by the Data Streams Engine when it sends the report that contains the price of the token received.

Note: The reports sent to the `DataStreamsConsumer` contract are verified by a Verifier contract that you can set when initializing the contract.

<sub> This contract has been tested mainly on the Arbitrum Goerli testnet network as this is the only network that currently supports the Data Streams feature as of now. </sub>

## Tech Stack

-   [hardhat](https://hardhat.org/)

## Quick start

1. Install dependencies

```bash
cd contracts
npm install
```

2. Set environment variables by copying `.env.example` to `.env` and filling in the values:

-   _PRIVATE_KEY_ - for the account you want to use.
-   _ETHERSCAN_API_KEY_ - API key for Etherscan API access.
-   _INFURA_KEY_ - API key for Infura Ethereum node access.

## Deploy

You can deploy the contract by executing the deploy script:

```bash
npx hardhat run scripts/deploy.ts --network goerli
```

For your convenience the deploy script has all the constructor arguments filled in. If you want to change the constructor arguments you can check what data streams Chainlink currenly supports [here](https://docs.chain.link/data-streams/stream-ids?network=arbitrum&page=1#arbitrum-goerli)

## Register your upkeep

After deploying the `DataStreamsConsumer` contract you should register your upkeep by following [Chainlink's guide](https://docs.chain.link/data-streams/getting-started#register-the-upkeep). In our use case "Contract to automate" and "Contract emitting logs" are the same contract i.e `DataStreamsConsumer`. When you choose "Contract emitting logs" you should click the "use custom ABI instead?" option and send the `DataStreamsConsumer.sol` ABI from the `artifacts/contracts/DataStreamsConsumer.sol/DataStreamsConsumer.json` file. After sending the ABI you will have to pick an emitted log. Pick the `InitiateTrade` option from the select with the events options and continue registering your upkeep.

You should set an initiale balance of at least 2 LINK. The other inputs are optional and you can enter whatever value you want.

## Emit a log

After you deploy the contracts and register the upkeep you should emit the `InitialTrade` event from the emitter contract. You can do this by running:

```bash
npx hardhat run scripts/trade.ts --network goerli
```

If you haven't changed the feed it will trade WETH to USDC on the Arbitrum Goerli network. For successful trade you need to have WETH in your account. The trade script will approve the consumer contract to handle your tokens.

You can change the values of the trade function as you wish in case you want to change the value expected to be traded (as long as you have this much WETH).

## Upgrading the contract

We use the proxy pattern provided by the `hardhat` environment for a better experience developing the Data Streams functionality.

After you have deployed the contract and you want to make some improvements on the `DataStreamsConsumer` contract you can run the `upgrade.ts` script as long as you change the `proxyAddress` variable with your proxy address which you can get from the `openzeppelin` folder.

## Testing

1. In order to test this project you need to have filled the .env.example file

2. `npx hardhat test`

## Questions?

You can [open an issue](https://github.com/smartcontractkit/datastreams-demo/issues) or drop us a line on [Discord](https://discord.com/invite/chainlink).

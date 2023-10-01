# Chainlink Low Latency Data Feeds Demo

> **Note**
>
> _This demo represents an educational example to use a Chainlink system, product, or service and is provided to demonstrate how to interact with Chainlink’s systems, products, and services to integrate them into your own. This template is provided “AS IS” and “AS AVAILABLE” without warranties of any kind, it has not been audited, and it may be missing key checks or error handling to make the usage of the system, product or service more clear. Do not use the code in this example in a production environment without completing your own audits and application of best practices. Neither Chainlink Labs, the Chainlink Foundation, nor Chainlink node operators are responsible for unintended outputs that are generated due to errors in code._

This project demonstrates how to use Chainlink Low Latency price feeds - part of Chainlink’s family of low-latency, hybrid price feed solutions in a full-stack implementation.

## Architecture overview



## Frontend

This directory is a Next.js project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

It contains the frontend for the data feeds demo dApp.

## Quick Start

Install all dependencies:

```bash
npm install
```

Set environment variables by copying `.env.example` to `.env` and filling in the values:

- _NEXT_PUBLIC_ALCHEMY_API_KEY_ for the network you want to use. You can get one from [Alchemy](https://www.alchemy.com/).
- _NEXT_PUBLIC_WALLET_CONNECT_ID_ for the wallet connector. You can get one from [WalletConnect](https://walletconnect.org/).

For connecting to Chainlink's Low Latency feeds you need to also fill in the following `.env` variables:
- _CHAINLINK_CLIENT_ID_ - The ID is provided to you by Chainlink.
- _CHAINLINK_CLIENT_SECRET_ - The secret is provided to you by Chainlink. 
- _CHAINLINK_API_URL_ api url for consuming the feeds via REST. No `http/https` prefixes should be used. Example: `api.chain.link`
- _CHAINLINK_WEBSOCKET_URL_ optional for consuming feeds via websocket. No `http/https` prefixes should be used. Example: `ws.chain.link`

You can get those from your Chainlink platform coordinator.

Run `npm run dev` in your terminal, and then open [localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [RainbowKit](https://www.rainbowkit.com/)
- [wagmi](https://wagmi.sh/) & [viem](https://viem.sh/)
- [shadcn/ui](https://ui.shadcn.com/)

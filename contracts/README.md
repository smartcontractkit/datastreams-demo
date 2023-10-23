# Data Streams Consumer

This is a project that utlizes the low latency on-chain data streams functionality that Chainlink presents. This is used by the `DataStreamsConsumer.sol` contract to trade two ERC20 tokens on UniSwap. The purpose of this is to prevent front-running and automate trade execution. This repository uses the Hardhat environment for development and testing.

# Project Details

-   This contract uses Chainlink Automation Log Trigger to require data. This log trigger comes from the `DataStreamsConsumer.sol` contract by the user when he executes the `trade` function which itself emits the `InitiateTrade` event.

-   This event will make the Decentralized Oracle Network call the `checkLog` function which will therefore trigger the `StreamsLookup` error. After that you can model the reports as you wish in the `checkCallback` function.

-   After that Chainlink Data Streams Engine will send the data to your `performUpkeep` function. The data will include a signed report that will be verified in the `performUpkeep` function and the extraData that has been sent which in our contract is the parameters of the `InitiateTrade` event i.e the recipient, the address of the token sent, the address of the token that you will recieve of and the amount that you are going to be sending. The amount that you will receive is calculated by the Data Streams Engine when it sends the report that contains the price of the token received.

Note: The reports sent to the `DataStreamsConsumer` contract are verified by a Verifier contract that you can set when initializing the contract.

<sub> This contract has been tested mainly on the Arbitrum Goerli testnet network as this is the only network that currently supports the Data Streams feature as of now. </sub>

# Installation

1. Clone the repository

```shell
git clone https://github.com/hackbg/chainlink-low-latency-consumer
```

2. Install the dependencies

```shell
cd chainlink-low-latency-consumer
npm install
```

3. Create a .env file following the .env.example file.

| Variable name     | Example Value                                                        | Description                                     |
| ----------------- | -------------------------------------------------------------------- | ----------------------------------------------- |
| PRIVATE_KEY       | `0xc42fdd4c4217bd050c73feea12abe71eb6296701cd298c77911b075fb9836892` | Private key for Ethereum wallet authentication. |
| ETHERSCAN_API_KEY | `UFN4ND7GM4WAHA7RVQMFQXMQP6WYBJZ3YA`                                 | API key for Etherscan API access.               |
| INFURA_KEY        | `1cb91b389fe9446e97e00e5278ea8325`                                   | API key for Infura Ethereum node access.        |

# Deploy

You can deploy the contract by executing the deploy script:

```shell
npx hardhat run scripts/deploy.ts --network goerli
```

For your convenience the deploy script has all the constructor arguments filled in. If you want to change the constructor arguments you can check what data streams Chainlink currenly supports [here](https://docs.chain.link/data-streams/stream-ids?network=arbitrum&page=1#arbitrum-goerli)

# Register your upkeep

After deploying the `DataStreamsConsumer` contract you should register your upkeep by following [Chainlink's guide](https://docs.chain.link/data-streams/getting-started#register-the-upkeep). In our use case "Contract to automate" and "Contract emitting logs" are the same contract i.e `DataStreamsConsumer`. When you choose "Contract emitting logs" you should click the "use custom ABI instead?" option and send the `DataStreamsConsumer.sol` ABI from the `artifacts/contracts/DataStreamsConsumer.sol/DataStreamsConsumer.json` file. After sending the ABI you will have to pick an emitted log. Pick the `InitiateTrade` option from the select with the events options and continue registering your upkeep.

You should set an initiale balance of at least 2 LINK. The other inputs are optional and you can enter whatever value you want.

# Emit a log

After you deploy the contracts and register the upkeep you should emit the `InitialTrade` event from the emitter contract. You can do this by running:

```shell
npx hardhat run scripts/trade.ts --network goerli
```

If you haven't changed the feed it will trade WETH to USDC on the Arbitrum Goerli network. For successful trade you need to have WETH in your account. The trade script will approve the consumer contract to handle your tokens.

You can change the values of the trade function as you wish in case you want to change the value expected to be traded (as long as you have this much WETH).

# Upgrading the contract

We use the proxy pattern provided by the `hardhat` environment for a better experience developing the Data Streams functionality.

After you have deployed the contract and you want to make some improvements on the `DataStreamsConsumer` contract you can run the `upgrade.ts` script as long as you change the `proxyAddress` variable with your proxy address which you can get from the `openzeppelin` folder.

# Testing

1. In order to test this project you need to have filled the .env.example file

2. ```shell
   npx hardhat test
   ```

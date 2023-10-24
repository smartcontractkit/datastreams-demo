import { ethers } from "hardhat";
import { abi } from "../artifacts/contracts/DataStreamsConsumer.sol/DataStreamsConsumer.json";

async function main() {
    const [signer] = await ethers.getSigners();
    const proxyAddress = "0xb017Bd229423af4a836baEBBB01110918e1E091A";
    const wethAddress = "0xe39ab88f8a4777030a534146a9ca3b52bd5d43a3";
    const usdc = "0x8fb1e3fc51f3b789ded7557e680551d93ea9d892";
    const amountIn = ethers.parseEther("0.001");

    const weth = await ethers.getContractAt("IERC20", wethAddress);

    const consumer = new ethers.Contract(proxyAddress, abi, signer);
    await weth.approve(await consumer.getAddress(), amountIn);
    await consumer.trade(wethAddress, usdc, amountIn);
    console.log("Successfully traded tokens");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

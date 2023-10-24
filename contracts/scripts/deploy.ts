import { ethers, upgrades } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners();
    const router = "0xab7664500b19a7a2362Ab26081e6DfB971B6F1B0";
    const verifier = "0xea9B98Be000FBEA7f6e88D08ebe70EbaAD10224c";
    const linkToken = "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3";

    const feedsId = [
        "0x00023496426b520583ae20a66d80484e0fc18544866a5b0bfee15ec771963274",
    ];

    const Consumer = await ethers.getContractFactory("DataFeedsConsumer");
    const consumer = await upgrades.deployProxy(
        Consumer,
        [router, verifier, linkToken, feedsId],
        { initializer: "initializer" }
    );
    await consumer.waitForDeployment();

    console.log("Consumer:");
    console.log(await consumer.getAddress());

    await signer.sendTransaction({
        value: ethers.parseEther("0.001"),
        to: await consumer.getAddress(),
    });

    console.log(`sent 0.001 ethers to consumer`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

import { ethers, upgrades } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners();
    const router = "0xab7664500b19a7a2362Ab26081e6DfB971B6F1B0";
    const verifier = '0xcB1241Fdf26501fA7A2d47d841dcF72C3CAa9dCe';
    const linkToken = "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3";

    const feedsId = [
        '0x00029584363bcf642315133c335b3646513c20f049602fc7d933be0d3f6360d3',
        '0x0002c407f448ffe50a15fd5f1ffe4791830c5f8fa39cd971a3d6ae337aef51a0',
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

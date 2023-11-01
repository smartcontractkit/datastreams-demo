import { ethers, upgrades } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners();
    /*
    const contract = new ethers.Contract(
        "0xcB2c15CEe8309A2442a1b0B35c475e1531C4CFE4",
        abi,
        signer
    );
    */
    const proxyAddress = "0xcB2c15CEe8309A2442a1b0B35c475e1531C4CFE4";

    const Consumer = await ethers.getContractFactory("DataStreamsConsumer");
    await upgrades.upgradeProxy(proxyAddress, Consumer);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

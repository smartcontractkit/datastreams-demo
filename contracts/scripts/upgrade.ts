import { ethers, upgrades } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners();
    /*
    const contract = new ethers.Contract(
        "0xb017Bd229423af4a836baEBBB01110918e1E091A",
        abi,
        signer
    );
    */
    const proxyAddress = "0xb017bd229423af4a836baebbb01110918e1e091a";

    const Consumer = await ethers.getContractFactory("DataStreamsConsumer");
    await upgrades.upgradeProxy(proxyAddress, Consumer);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

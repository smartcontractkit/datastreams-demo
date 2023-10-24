import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("DataStreamsConsumer", function () {
    async function setup() {
        const [owner, otherAccount] = await ethers.getSigners();

        const feedsId = [
            "0x00023496426b520583ae20a66d80484e0fc18544866a5b0bfee15ec771963274",
        ];
        const linkToken = "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3";
        const verifier = "0xea9B98Be000FBEA7f6e88D08ebe70EbaAD10224c";

        const weth = await ethers.getContractAt(
            "IERC20",
            "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3"
        );
        const usdc = await ethers.getContractAt(
            "IERC20",
            "0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892"
        );
        const router = await ethers.getContractAt(
            "ISwapRouter",
            "0xab7664500b19a7a2362Ab26081e6DfB971B6F1B0"
        );
        const keeperRegistry = await ethers.deployContract(
            "KeeperRegistryMock"
        );

        const Consumer = await ethers.getContractFactory("DataStreamsConsumer");
        const dataStreamsConsumer = await upgrades.deployProxy(
            Consumer,
            [await router.getAddress(), verifier, linkToken, feedsId],
            {
                initializer: "initializer",
            }
        );

        return {
            weth,
            dataStreamsConsumer,
            owner,
            otherAccount,
            router,
            keeperRegistry,
            usdc,
        };
    }

    describe("Swap", function () {
        it("Should swap funds", async function () {
            const { keeperRegistry, weth, dataStreamsConsumer, usdc } =
                await loadFixture(setup);
            const [signer] = await ethers.getSigners();

            // send eth to receive weth
            await signer.sendTransaction({
                value: ethers.parseEther("1"),
                to: await weth.getAddress(),
            });

            // send eth to consumer to verify reports
            await signer.sendTransaction({
                value: ethers.parseEther("1"),
                to: await dataStreamsConsumer.getAddress(),
            });

            const oldBalance = await usdc.balanceOf(signer);
            await weth.approve(
                await dataStreamsConsumer.getAddress(),
                ethers.parseEther("1")
            );

            await keeperRegistry.performUpkeep(dataStreamsConsumer);

            const newBalance = await usdc.balanceOf(signer);

            expect(newBalance).to.be.greaterThan(oldBalance);
        });
    });
});

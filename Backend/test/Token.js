const { expect } = require("chai");
const { ethers } = require("hardhat");
const BigNumber = require("bignumber.js");

describe("Token contract", function () {
  let Farm;
  let farm;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Farm = await ethers.getContractFactory("CropFarm");
    farm = await Farm.deploy();
  });

  describe("Deployment", function () {
    it("Assigns right number of crops", async function () {
      for (let i = 1; i <= 4; i++) {
        let ownerBalance = await farm.balanceOf(owner.address, i);
        expect(await farm.totalSupply(i)).to.equal(ownerBalance);
      }
    });
  });
  describe("Using crops", function () {
    it("Transfers crops", async function () {
      await farm
        .connect(owner)
        .safeTransferFrom(owner.address, addr1.address, 1, 50, 0x00);
      expect(await farm.balanceOf(addr1.address, 1)).to.equal(50);
    });
    it("Plants / harvests crops", async function () {
      await farm.plant(0, 2);
      let bruh = await farm.viewPlot(owner.address, 0);
      expect(bruh[0]).to.equal(2);
      await network.provider.send("evm_increaseTime", [200]);
      await farm.harvest(0);
      bruh = await farm.viewPlot(owner.address, 0);
      expect(bruh[0]).to.equal(0);
      expect(await farm.viewBalance(owner.address, 2, 0)).to.equal(1004);
      expect(await farm.balanceOf(owner.address, 2)).to.equal(1004);
      console.log("Real Balance: ", await farm.balanceOf(owner.address, 2));
      console.log(
        "Storage Balance: ",
        await farm.viewBalance(owner.address, 2, 0)
      );
    });
  });
  describe("Account info", function () {
    it("Buys new plots", async function () {
      await farm.plant(0, 1);
      await farm.buyPlot();
      expect(await farm.plotnum(owner.address)).to.equal(4);
      expect(await farm.balanceOf(farm.address, 1)).to.equal(10);
    });
  });
});

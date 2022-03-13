const { expect } = require("chai");

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
        // console.log("There are " + ownerBalance.toString() + " tokens with ID " + i);
      }
    });
  });
  describe("Using crops", function () {
    it("Transfers crops", async function () {
      await farm
        .connect(owner)
        .safeTransferFrom(owner.address, addr1.address, 1, 50, 0x00);
      expect(await farm.balanceOf(addr1.address, 1)).to.equal(50);
      // // TOKEN / MAPPING VALUES AFTER TRANSFER
      // console.log(
      //   "Owner has " +
      //     (await farm.balanceOf(owner.address, 0)) +
      //     " tokens of ID 0 on blockchain."
      // );
      // console.log(
      //   (
      //     "Owner has " + (await farm.viewValues(owner.address, 0, 0))
      //   ).toString() + " tokens of ID 0 in mapping."
      // );
      // console.log(
      //   "addr1 has " +
      //     (await farm.balanceOf(addr1.address, 0)) +
      //     " tokens of ID 0 on blockchain."
      // );
      // console.log(
      //   (
      //     "addr1 has " + (await farm.viewValues(addr1.address, 0, 0))
      //   ).toString() + " tokens of ID 0 in mapping."
      // );
    });
    it("Plants crops", async function () {
      await farm.plant(0, 1);
      expect(await farm.viewPlot(owner.address, 0)).to.equal(1);
    });
  });
  describe("Account info", function () {
    it("Buys new plots", async function () {
      await farm.plant(0, 1);
      await farm._newPlot(owner.address);
      expect(await farm._plotNum(owner.address)).to.equal(4);
    });
  });
});

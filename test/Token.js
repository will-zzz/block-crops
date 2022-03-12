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
      for (let i = 0; i <= 3; i++) {
        let ownerBalance = await farm.balanceOf(owner.address, i);
        expect(await farm.totalSupply(i)).to.equal(ownerBalance);
        // console.log("There are " + ownerBalance.toString() + " tokens with ID " + i);
      }
    });

    it("Transfers crops", async function () {
      await farm
        .connect(owner)
        .safeTransferFrom(owner.address, addr1.address, 0, 50, 0x00);
      expect(await farm.balanceOf(addr1.address, 0)).to.equal(50);
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
      await farm.plant(0, 100, 0);
      console.log(
        "The time is: " +
          (await farm.viewValues(owner.address, 0, 2)).toString()
      );
    });
  });
});

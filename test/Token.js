const { expect } = require("chai");

describe("Token contract", function () {
  it("Assigns right number of crops", async function () {
    const [owner] = await ethers.getSigners();

    const Farm = await ethers.getContractFactory("CropFarm");
    const farm = await Farm.deploy();

    let ownerBalance = await farm.balanceOf(owner.address, 0);
    expect(await farm.totalSupply(0)).to.equal(ownerBalance);
  });
});
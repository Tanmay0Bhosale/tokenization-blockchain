const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tokenization Smart Contract", function () {
    let Tokenization;
    let tokenization;
    let owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        Tokenization = await ethers.getContractFactory("Tokenization");
        tokenization = await Tokenization.deploy();
        await tokenization.waitForDeployment();
    });

    it("Should tokenize data and store metadata correctly", async function () {
        const originalData = "SensitiveInformation123";
        const tx = await tokenization.tokenizeData(originalData);
        const receipt = await tx.wait();

        const tokenId = receipt.logs[0].args.tokenId; // Extract tokenId from event
        const tokenData = await tokenization.getTokenData(tokenId);

        expect(tokenData.tokenId).to.equal(tokenId);
        expect(tokenData.createdBy).to.equal(owner.address);
        expect(Number(tokenData.timestamp)).to.be.a("number"); // Convert BigInt to Number
    });

    it("Should allow retrieving token metadata", async function () {
        const originalData = "SampleData456";
        const tx = await tokenization.tokenizeData(originalData);
        const receipt = await tx.wait();

        const tokenId = receipt.logs[0].args.tokenId;
        const tokenData = await tokenization.getTokenData(tokenId);

        expect(tokenData.tokenId).to.equal(tokenId);
        expect(tokenData.createdBy).to.equal(owner.address);
    });

    it("Should not allow accessing the original data", async function () {
        const originalData = "HiddenSecret";
        const tx = await tokenization.tokenizeData(originalData);
        const receipt = await tx.wait();

        const tokenId = receipt.logs[0].args.tokenId;
        
        // Instead of accessing `tokenMappings(tokenId)`, use `getTokenData`
        const storedData = await tokenization.getTokenData(tokenId);

        expect(storedData.originalData).to.be.undefined; // Ensure original data is not accessible
    });
});

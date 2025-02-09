const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed address
    const tokenId = 3; // Replace with the correct token ID (you can check getLastTokenId.js for the latest one)

    const Tokenization = await ethers.getContractAt("Tokenization", contractAddress);
    
    const tokenizedData = await Tokenization.getTokenData(tokenId);
    console.log("Retrieved Tokenized Data:", tokenizedData);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

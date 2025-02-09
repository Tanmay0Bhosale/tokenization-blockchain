const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; // Replace with actual deployed address
    const tokenId = 1; // Replace with the correct token ID

    const Tokenization = await ethers.getContractAt("Tokenization", contractAddress);
    
    const tokenizedData = await Tokenization.getTokenData(tokenId);
    console.log("Retrieved Tokenized Data:", tokenizedData);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

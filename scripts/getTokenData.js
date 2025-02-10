const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0xd540FfF71a0D76B460a3c54a63DEcBc7AF233BB6"; // Replace with actual deployed address
    const tokenId = 2; // Replace with the correct token ID (you can check getLastTokenId.js for the latest one)

    const Tokenization = await ethers.getContractAt("Tokenization", contractAddress);
    
    const tokenizedData = await Tokenization.getTokenData(tokenId);
    console.log("Retrieved Tokenized Data:", tokenizedData);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

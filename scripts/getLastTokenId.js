const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address

    // Get the contract instance
    const Tokenization = await ethers.getContractAt("Tokenization", contractAddress);

    // Fetch the last token ID
    const lastTokenId = await Tokenization.getLastTokenId();
    console.log("Last Token ID:", lastTokenId.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address
    const dataToTokenize = "tom"; // Replace with actual data

    const Tokenization = await ethers.getContractAt("Tokenization", contractAddress);

    const tx = await Tokenization.tokenizeData(dataToTokenize);
    await tx.wait(); // Wait for transaction to be mined

    console.log("Data tokenized successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

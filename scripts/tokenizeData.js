const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0xd540FfF71a0D76B460a3c54a63DEcBc7AF233BB6"; // Replace with your deployed contract address
    const dataToTokenize = "tom_2323"; // Replace with actual data

    const Tokenization = await ethers.getContractAt("Tokenization", contractAddress);

    const tx = await Tokenization.tokenizeData(dataToTokenize);
    await tx.wait(); // Wait for transaction to be mined

    console.log("Data tokenized successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

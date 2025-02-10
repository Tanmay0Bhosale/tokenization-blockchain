async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Interacting with contract using account:", deployer.address);

    // Address of the deployed contract (replace with actual address)
    const tokenizationAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const Tokenization = await hre.ethers.getContractFactory("Tokenization");
    const tokenization = await Tokenization.attach(tokenizationAddress);

    // Tokenize data (replace with your data)
    const tokenId = await tokenization.tokenizeData("Sensitive data example");
    console.log("Data tokenized with Token ID:", tokenId);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Interacting with contract using account:", deployer.address);

    // Address of the deployed contract (replace with actual address)
    const tokenizationAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
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

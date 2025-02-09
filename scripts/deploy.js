async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy the Tokenization contract
    const Tokenization = await hre.ethers.getContractFactory("Tokenization");
    const tokenization = await Tokenization.deploy();

    // Wait for deployment
    await tokenization.waitForDeployment();

    // Log deployed address
    const contractAddress = await tokenization.getAddress();
    console.log("Tokenization contract deployed to:", contractAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

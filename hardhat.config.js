require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache's RPC URL
      accounts: ["0xdf75fe817e7c71bec033e65bc37e340665366b90267137fc7bacbd7ccb28ff17"] // Your wallet private key 0xdalnahai
    }
  },
};

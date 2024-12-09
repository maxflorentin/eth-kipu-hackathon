require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY


module.exports = {
  solidity: "0.8.19", // Versión de Solidity compatible con OpenZeppelin 5.1.0
  paths: {
    sources: "./contracts", // Carpeta donde están tus contratos
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    sepolia: {
      url: ALCHEMY_API_KEY,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};
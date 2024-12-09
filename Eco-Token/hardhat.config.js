require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const SCROLL_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY
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
    scrollSepolia: {
      url: ALCHEMY_API_KEY,
      accounts: [`0x${SCROLL_PRIVATE_KEY}`], // Clave privada
      chainId: 534351, // Chain ID de Scroll Sepolia
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
  sourcify: {
    enabled: true
  }
};
require("@nomicfoundation/hardhat-toolbox");

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
};

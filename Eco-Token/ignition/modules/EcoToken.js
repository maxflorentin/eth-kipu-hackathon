const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const EcoTokenModule = buildModule("EcoTokenModule", (m) => {
    // Agregar parámetros necesarios para el constructor
    const feeCollector = "0x5045253CE16EEB4BBf0806cBffEfEf8802Ac2120"; // Reemplaza con la dirección del feeCollector

    // Definir el contrato y pasar el parámetro al constructor
    const eco = m.contract("EcoToken", [feeCollector]);

    return { eco };
});

module.exports = EcoTokenModule;


// Deployment
/* 

npx hardhat ignition deploy ./ignition/modules/EcoToken.js



- Deploy en red Local
npx hardhat node

npx hardhat ignition deploy ./ignition/modules/EcoToken.js --network localhost


- Deploy en red Sepolia
npx hardhat ignition deploy ./ignition/modules/EcoToken.js --network sepolia
EcoTokenModule#EcoToken - 0xBCA881332E6E91165346E9159797f7647336d506


- Verificar el estado del contrato en Sepolia
npx hardhat verify --network sepolia --force 0xBCA881332E6E91165346E9159797f7647336d506
*/
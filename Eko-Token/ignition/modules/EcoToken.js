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
// npx hardhat ignition deploy ./ignition/modules/EcoToken.js
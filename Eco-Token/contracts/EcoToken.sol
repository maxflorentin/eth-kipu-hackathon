// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract EcoToken is ERC20, Ownable, Pausable {
    // Direcciones autorizadas (Puntos Verdes)
    mapping(address => bool) public greenPoints;

    // Dirección que recibe los fees
    address public feeCollector;

    // Evento para el registro de minting
    event TokensMinted(
        address indexed greenPoint,
        address indexed user,
        uint256 amount
    );
    event TokensBurned(address indexed user, uint256 amount, uint256 fee);

    constructor(address _feeCollector) ERC20("EcoToken", "ECO") {
        feeCollector = _feeCollector;
    }

    // Modificador para verificar si un Punto Verde está autorizado
    modifier onlyGreenPoint() {
        require(greenPoints[msg.sender], "Not an authorized green point");
        _;
    }

    // Registrar un nuevo Punto Verde
    function registerGreenPoint(address greenPoint) external onlyOwner {
        greenPoints[greenPoint] = true;
    }

    // Remover un Punto Verde
    function removeGreenPoint(address greenPoint) external onlyOwner {
        greenPoints[greenPoint] = false;
    }

    // Pausar el contrato (solo el owner)
    function pause() external onlyOwner {
        _pause();
    }

    // Reanudar el contrato (solo el owner)
    function unpause() external onlyOwner {
        _unpause();
    }

    // Minting de tokens desde un Punto Verde
    function mintFromGreenPoint(
        address to,
        uint256 amount
    ) external onlyGreenPoint whenNotPaused {
        require(to != address(0), "Invalid user address");
        require(amount > 0, "Amount must be greater than zero");

        _mint(to, amount);

        emit TokensMinted(msg.sender, to, amount);
    }

    // Quemar tokens para intercambiarlos por USDT con un fee del 3%
    function burnForExchange(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");
        address user = msg.sender;

        // Calcular el fee del 3%
        uint256 fee = (amount * 3) / 100;
        uint256 amountAfterFee = amount - fee;

        // Quemar los tokens del usuario
        _burn(user, amount);

        // Transferir el fee al feeCollector
        _mint(feeCollector, fee);

        emit TokensBurned(user, amount, fee);
    }

    // Cambiar la dirección del feeCollector
    function setFeeCollector(address _feeCollector) external onlyOwner {
        require(_feeCollector != address(0), "Invalid fee collector address");
        feeCollector = _feeCollector;
    }

    // Verificar si una dirección es un Punto Verde
    function isGreenPoint(address greenPoint) external view returns (bool) {
        return greenPoints[greenPoint];
    }
}

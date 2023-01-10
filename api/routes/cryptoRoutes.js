
const express = require("express");
const cryptoController = require("../controllers/cryptoController");

const router = express.Router();

router.get("/", cryptoController.getCryptoList);

router.get("/:cryptoId", cryptoController.getCryptoById);

module.exports = router;
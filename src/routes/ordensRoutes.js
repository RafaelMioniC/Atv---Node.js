const express = require("express");

const router = express.Router();

const ordemController = require("../controllers/ordemController");

router.post("/", ordemController.criarOrdem);

router.get("/", ordemController.listarOrdens);

router.get("/:codigoOrdem", ordemController.buscarOrdem);

router.put("/:codigoOrdem", ordemController.atualizarOrdem);

router.delete("/:codigoOrdem", ordemController.excluirOrdem);

module.exports = router;
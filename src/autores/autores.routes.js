const express = require("express");
const autoresController = require("./autores.controller");
const { requireJWTAuth, requirePermissao } = require("../auth/auth.config");

const router = express.Router();

// Rotas PÚBLICAS (sem autenticação)
router.get("/autores", autoresController.listar);
router.get("/autores/:id", autoresController.buscarPorId);
router.get("/autores/:id/livros", autoresController.listarLivros);

// Rotas PROTEGIDAS (requer autenticação)
router.post("/autores", requireJWTAuth, autoresController.criar);
router.put("/autores/:id", requireJWTAuth, autoresController.atualizar);

// Rotas PROTEGIDAS (requer permissão específica)
router.delete(
    "/autores/:id",
    requirePermissao("DELETAR_AUTOR"),
    autoresController.deletar
);

module.exports = router;

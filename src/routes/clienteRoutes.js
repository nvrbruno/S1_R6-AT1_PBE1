const express = require("express");
const router = express.Router();
const { clienteController } = require("../controllers/clienteController");

//GET /clientes -> Lista todos os clientes
router.get("/clientes", clienteController.listarClientes);

//POST /clientes -> Adiciona um novo cliente
router.post("/clientes", clienteController.criarCliente);

//PUT /clientes/idCliente -> atualizar um cliente
router.put("/clientes/:idCliente", clienteController.atualizarCliente);

//DELETE /produtos/idProduto -> DELETAR um cliente
router.delete("/clientes/:idCliente", clienteController.deletarCliente);

module.exports = { clienteRoutes: router };

const express = require ("express");
const router = express.Router();
const { pedidoController } = require("../controllers/pedidoController");

/**
 * Define as rotas relacionadas aos pedidos
 * @module pedidoRoutes
 * @description
 * - GET /pedidos -> Lista todos os pedidos do banco de dados
 * - POST /pedidos -> Cria um novo pedido e os seus intens com dados envidados pelo cliente HTTP
 * @throws 
 */

router.get ("/pedidos", pedidoController.listarPedidos);
router.post ("/pedidos", pedidoController.criarPedido);
module.exports = {pedidoRoutes: router};

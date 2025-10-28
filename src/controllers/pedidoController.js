const { pedidoModel } = require("../models/pedidoModel");
const { clienteModel } = require("../models/clienteModel");
const { produtoModel } = require("../models/produtoModel");

const pedidoController = {
  /**
   * COntrolador lista todos os pedidos do banco de dados
   *
   * @async
   * @function listarPedidos
   * @param {object} req -Objeto da requisição(recebido do cliente http)
   * @param {object} res - Objeto da resposta do servidor( enviado ao cliente http)
   * @returns {Promise<void>} Restorna uma resposta JSON com a lista de pedidos.
   * @throws Mostra no console e retorna tambem erro 500 se ocorrer falha ao buscar os pedidos
   */
  listarPedidos: async (req, res) => {
    try {
      const pedidos = await pedidoModel.buscarTodos();

      res.status(200).json(pedidos);
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      res
        .status(500)
        .json({ erro: " Erro interno no servidor ao listar pedidos !" });
    }
  },
  criarPedido: async (req, res) => {
    try {
      const { idCliente, dataPedido, statusPagamento, itens } = req.body;

      if (
        idCliente == undefined ||
        dataPedido == undefined ||
        statusPagamento == undefined ||
        itens.length < 1
      ) {
        return res
          .status(400)
          .json({ erro: "Campos obrigatórios não preeenchidos !" });
      }

      if (idCliente.length != 36) {
        return res.status(400).json({ erro: "Id do Cliente inválido!" });
      }

      const cliente = await clienteModel.buscarUm(idCliente);

      if (!cliente || cliente.length != 1) {
        return res.status(404).json({ erro: "Cliente não encontrado" });
      }
      for (const item of itens) {
        const { idProduto, qtdItem } = item;

        if (idProduto == undefined || qtdItem == undefined) {
          return res
            .status(400)
            .json({ erro: "Campos obrigatórios não preenchidos !" });
        }
        if (idProduto.length != 36) {
          return res.status(400).json({ erro: "Id do produto inválido!" });
        }

        const produto = await produtoModel.buscarUm(idProduto);

        if (!produto || produto.length != 1) {
          return res.status(404).json({ erro: "Produto não encontrado" });
        }
      }
      await pedidoModel.inserirPedido(
        idCliente,
        dataPedido,
        statusPagamento,
      {itens}
      );

      res.status(201).json({ message: "Pedido cadastrado com sucesso" });
    } catch (error) {
      console.error("Erro ao cadastrar pedido:", error);
      res
        .status(500)
        .json({ erro: "Erro interno no servidor ao cadastrar pedido !" });
    }
  },
};
module.exports = { pedidoController };

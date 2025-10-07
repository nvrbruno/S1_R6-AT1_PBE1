const { produtoModel } = require("../models/produtoModel");

const produtoController = {
  //---------------------------
  //LISTAR TODOS OS PRODUTOS
  //GET /produtos
  //---------------------------

  listarProdutos: async (req, res) => {
    try {
      const produtos = await produtoModel.buscarTodos();

      res.status(200).json(produtos);
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      res.status(500).json({ message: "Erro ao buscar produtos." });
    }
  },

  //---------------------------
  //CRIAR UM NOVO PRODUTO
  //GET /produtos
  /*
  {
      "nomeProduto": "Valor",
      "preoProduto": "0.00",  
  }
  */
  //---------------------------
  criarProduto: async (req, res) => {
    try {
      const { nomeProduto, precoProduto } = req.body;
      if (
        nomeProduto === undefined ||
        precoProduto == undefined ||
        isNaN(precoProduto)
      ) {
        return res
          .status(400)
          .json({ erro: "Campos obrigatorios não preenchidos" });
      }

      await produtoModel.inserirProduto(nomeProduto, precoProduto);

      res.status(201).json({ message: "Produto cadastrado com sucesso!" });
    } catch (error) {
      
      console.error('Erro ao cadastrar o produto:',error);
      res.status(500).json({erro: 'Erro no serivodr ao cadastrar produto!'})
    }
  },
};

module.exports = { produtoController };

const { clienteModel } = require("../models/clienteModel");

const clienteController = {
  //---------------------------
  //LISTAR TODOS OS CLIENTES
  //GET /CLIENTES
  //---------------------------

  listarClientes: async (req, res) => {
    try {
      const clientes = await clienteModel.buscarTodos(); //busca todos os clientes

      res.status(200).json(clientes);
    } catch (error) {
      console.error("Erro ao listar os clientes:", error);
      res.status(500).json({ message: "Erro ao buscar os clientes." });
    }
  },

  //---------------------------
  //ADICIONAR CLIENTES
  //POST /CLIENTES
  //---------------------------

  criarCliente: async (req, res) => { //terminar aqui
    try {
      const { nomeCliente, cpfCliente } = req.body;
      if (
        nomeCliente === undefined ||
        cpfCliente == undefined
      ) {
        return res
          .status(400)
          .json({ erro: "Campos obrigatorios não preenchidos" });
      }
      const clientes = await clienteModel.buscarCPF(cpfCliente)

      if (clientes.length > 0) { //condição para procurar se o cpf ja está cadastrado no banco de dados
        return res.status(409).json({ erro: "Esse cpf já esta cadastrado" });
      }

      await clienteModel.inserirCliente(nomeCliente, cpfCliente );

      res.status(201).json({ message: "cliente cadastrado com sucesso!" });
    } catch (error) {
      
      console.error('Erro ao cadastrar o cliente:',error);
      res.status(500).json({erro: 'Erro no servidor ao cadastrar cliente!'})
    }
  },
};

module.exports = { clienteController };
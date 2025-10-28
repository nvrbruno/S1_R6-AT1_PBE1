const { sql, getConnection } = require("../config/db");

const clienteModel = {

  buscarTodos: async () => {
    try {
      const pool = await getConnection(); //Cria conexão com o DB
      let sql = "SELECT * FROM Clientes";

      const result = await pool.request().query(sql);
      return result.recordset;
    } catch (error) {
      console.error("Erro ao buscar os clientes", error);
      throw error; // Passa o erro para o controller tratar
    }
  },
  buscarUm: async (idCliente) => {
    try {
      const pool = await getConnection();

      const querySQL = "SELECT * FROM Clientes WHERE idCliente = @idCliente";

      const result = await pool
        .request()
        .input("idCliente", sql.UniqueIdentifier, idCliente)
        .query(querySQL);
      return result.recordset;
    } catch (error) {
      console.error("erro ao buscar o Cliente.", error);
    }
  },

  buscarCPF: async (cpfCliente) => {
    try {
      const pool = await getConnection(); //Cria conexão com o DB
      let querySql = "SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente"; //faz busca do cpf

      const result = await pool
        .request()
        .input("cpfCliente", sql.VarChar(12), cpfCliente)
        .query(querySql);

      return result.recordset;
    } catch (error) {
      console.error("Erro ao buscar CPF do cliente", error);
      throw error; // Passa o erro para o controller tratar
    }
  },

  inserirCliente: async (nomeCliente, cpfCliente) => {
    try {
      const pool = await getConnection();

      let querySQL =
        "INSERT INTO Clientes(nomeCliente, cpfCliente) VALUES (@nomeCliente, @cpfCliente)";

      await pool
        .request()
        .input("nomeCliente", sql.VarChar(200), nomeCliente)
        .input("cpfCliente", sql.VarChar(12), cpfCliente)
        .query(querySQL);
    } catch (error) {
      console.error("Erro ao inserir clientes:", error);
      throw error; // Passa o erro para o controller tratar
    }
  },
  atualizarCliente: async (nomeCliente, cpfCliente) => {
    try {
      const pool = await getConnection();
      const querySQL = `
      UPDATE clientes
      SET nomeCliente = @nomeCliente
      WHERE cpfCliente = @cpfCliente
      `;
      await pool
        .request()
        .input("cpfCliente", sql.VarChar(11), cpfCliente)
        .input("nomeCliente", sql.VarChar(100), nomeCliente)
        .query(querySQL);
    } catch (error) {}
  },
  deletarCliente: async (cpfCliente) => {
    try {
      const pool = await getConnection();

      const querySQL = "DELETE FROM clientes WHERE cpfCliente=@cpfCliente;";

      await pool
        .request()
        .input("cpfCliente", sql.VarChar(11), cpfCliente)
        .query(querySQL);
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      throw error;
    }
  },
};

module.exports = { clienteModel };

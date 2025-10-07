const { sql, getConnection } = require("../config/db");

const produtoModel = {
  buscarTodos: async () => {
    try {
      const pool = await getConnection(); //Cria conexão com o DB

      let sql = "SELECT * FROM Produtos";

      const result = await pool.request().query(sql);

      return result.recordset;
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      throw error; // Passa o erro para o controller tratar
    }
  },

  inserirProduto: async (nomeProduto, precoProduto) => {
    try {
      const pool = await getConnection();

      let querySQL =
        "INSERT INTO Produtos(nomeProduto,precoProduto) VALUES (@nomeProduto, @precoProduto)";

      await pool
        .request()
        .input("nomeProduto", sql.VarChar(100), nomeProduto)
        .input("precoProduto", sql.Decimal(10, 2), precoProduto)
        .query(querySQL);
    } catch (error) {
      console.error("Erro ao inserir produtos:", error);
      throw error; // Passa o erro para o controller tratar
    }
  },
};

module.exports = { produtoModel };

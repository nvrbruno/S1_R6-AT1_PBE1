const { UniqueIdentifier } = require("mssql");
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

  buscarUm: async (idProduto) => {
    try {
      const pool = await getConnection();

      const querySQL = "SELECT * FROM Produtos WHERE idProduto= @idProduto";

      const result = await pool
        .request()
        .input("idProduto", sql.UniqueIdentifier, idProduto)
        .query(querySQL);
      return result.recordset;
    } catch (error) {
      console.error("erro ao buscar o produto.", error);
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
  atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
    try {
      const pool = await getConnection();
      const querySQL = `
      UPDATE Produtos
        SET nomeProduto = @nomeProduto,
        precoProduto = @precoProduto
      WHERE idProduto = @idProduto
    `;
      await pool
        .request()
        .input("idProduto", sql.UniqueIdentifier, idProduto)
        .input("nomeProduto", sql.VarChar(100), nomeProduto)
        .input("precoProduto", sql.Decimal(10, 2), precoProduto)
        .query(querySQL);
    } catch (error) {}
  },
  deletarProduto: async (idProduto) => {
    try {
      const pool = await getConnection();

      const querySQL = "DELETE FROM Produtos WHERE idProduto =@idProduto";

      await pool
        .request()
        .input("idProduto", sql.UniqueIdentifier, idProduto)
        .query(querySQL);
    } catch (error) {
      console.error("Erro ao deletar o produto;", error);
      throw error;
    }
  },
};

module.exports = { produtoModel };

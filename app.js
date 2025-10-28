const express = require("express");
const app = express();
const {produtoRoutes} = require("./src/routes/produtoRoutes");
const {clienteRoutes} = require("./src/routes/clienteRoutes");
const {pedidoRoutes} = require ("./src/routes/pedidoRoutes");

const PORT = 8081;

app.use(express.json());

app.use('/', produtoRoutes);
app.use('/', clienteRoutes);
app.use('/', pedidoRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor Rodando em http://localhost:${PORT}`);
})
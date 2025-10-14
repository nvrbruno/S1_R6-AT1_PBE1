const express = require("express");
const app = express();
const { clienteRoutes } = require("./src/routes/clienteRoutes");

const PORT = 8081;

app.use(express.json());

app.use("/", clienteRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})



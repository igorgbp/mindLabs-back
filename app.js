const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(routes);

app.listen(4534, () => console.log("Servidor rodando na porta 4534"));
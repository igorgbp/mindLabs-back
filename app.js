const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const cors = require("cors");

const routes = require("./routes");

// Configurar o CORS
const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});
app.use(express.json());
app.use(routes);

const port = 4534;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

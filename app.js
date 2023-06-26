const express = require("express");
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const routes = require("./routes");
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});
app.use(express.json());
app.use(routes);


app.listen(4534, () => console.log("Servidor rodando na porta 4534"));
const express = require("express");
const { getUser, insertUser, loginCheck } = require("./db");
const app = express();

app.use(express.json());

app.post("/cad-user", (req, res) => {
  async function run() {
    const file = req.body;
    console.log("route cad-user");
    const cad = await insertUser(file);
    console.log('cad', cad);
  }
  run()
});

app.get("/fetch-user", (req, res) => {
  async function run() {
    console.log("inside fetch-user");
    const user = await getUser();
    console.log("user", user);
  }
  run();
});

app.post("/login", (req, res) => {
    async function run() {
      console.log("inside fetch-user app");
      const data = req.body;
      console.log('data in app.get',data)
      const user = await loginCheck(data);
      console.log("user", user);
      console.log(typeof user)
    }
    run();
  });



app.listen(4534, () => console.log("servidor rolando na 3002"));

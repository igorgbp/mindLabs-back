const express = require("express");
const {  cadUser, removeUser,listUsers, login } = require("./db");

const router = express.Router();

router.post("/cad-user", async (req, res) => {
  try {
    const cadData = req.body;
    const cad = await cadUser(cadData);
    res.json(cad);
  } catch (error) {
    console.error("Error during cad-user:", error);
    res.status(500).json({ error: "Internal server error, erro na routes.js" });
  }
});

router.delete("/remove-user", async (req, res) => {
  try {
    const cadData = req.body;
    console.log(cadData)
    const cad = await removeUser(cadData);
    res.json(cad);
  } catch (error) {
    console.error("Error during cad-user:", error);
    res.status(500).json({ error: "Internal server error, erro na routes.js" });
  }
});

router.get("/list-users", async (req, res) => {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (error) {
    console.error("Error during cad-user:", error);
    res.status(500).json({ error: "Internal server error, erro na routes.js" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const loginData = req.body;
    const user = await login(loginData);
    res.json(user);
  } catch (error) {
    console.error("Error during cad-user:", error);
    res.status(500).json({ error: "Internal server error, erro na routes.js" });
  }
});

module.exports = router;

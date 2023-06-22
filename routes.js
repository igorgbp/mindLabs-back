const express = require("express");
const {  cadUser, removeUser,listUsers, login, listProducts } = require("./db");

const router = express.Router();

// users
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
    
    if(user.length==0) res.status(401).json(user) 
    else res.json(user);
    console.log(user.length)
  } catch (error) {
    console.error("Error during cad-user:", error);
    res.status(500).json({ error: "Internal server error, erro na routes.js" });
  }
});


// product
router.get("/list-products", async (req, res)=>{
  try{
    const products = await listProducts();
    console.log(products);
    res.json(products);
  }catch{
    console.log('asdf')
  }
})

router.get("/list-products-by-category", async (req, res)=>{
  try{
    const category = req.body;
    const products = await listProductsByCategory(category);
    console.log(products);
    res.json(products);
  }catch{
    console.log('asdf')
  }
})

router.get("/list-products-promo", async (req, res)=>{
  try{
   
    const products = await listProductsPromo();
    console.log(products);
    res.json(products);
  }catch{
    console.log('asdf')
  }
})

module.exports = router;

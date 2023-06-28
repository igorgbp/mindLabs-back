const express = require("express");
const {
  cadUser,
  updateUser,
  removeUser,
  listUsers,
  login,
  listProducts,
  listProductsFavorite,
  listProductsByCategory,
  listUserAddress,
  removeAddress,
  cadAddress,
  cadFavorite,
} = require("./db");

const router = express.Router();
const fetch = require("node-fetch");
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
    console.log(cadData);
    const cad = await removeUser(cadData);
    res.json(cad);
  } catch (error) {
    console.error("Error during cad-user:", error);
    res.status(500).json({ error: "Internal server error, erro na routes.js" });
  }
});

router.post("/update-user", async (req, res) => {
  try {
    const cadData = req.body;
    console.log('asd',cadData)
    const cad = await updateUser(cadData);
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

    if (user.length == 0) res.status(401).json(user);
    else res.json(user);
    console.log(user.length);
  } catch (error) {
    console.error("Error during cad-user:", error);
    res.status(500).json({ error: "Internal server error, erro na routes.js" });
  }
});

//favorites 
router.post("/cad-favorite", async (req, res) => {
  try {
    const cadFavoriteData = req.body;
    const result = await cadFavorite(cadFavoriteData);
    res.json(result);
  } catch (error) {
    console.error("Error during cad-user:", error);
    res.status(500).json({ error: "Internal server error, erro na routes.js" });
  }
});

//list product
router.get("/list-products", async (req, res) => {
  try {
    const products = await listProducts();
    console.log(products);
    res.json(products);
  } catch {
    console.log("asdf");
  }
});

router.post("/list-products-favorite", async (req, res) => {
  try {
    const id = req.body;
    const products = await listProductsFavorite(id);
    // console.log(products);
    res.json(products);
  } catch {
    console.log("asdf");
  }
});

router.get("/list-products-by-category", async (req, res) => {
  try {
    const category = req.body;
    const products = await listProductsByCategory(category);
    res.json(products);
  } catch {
    console.log("asdf");
  }
});

router.get("/list-products-promo", async (req, res) => {
  try {
    const products = await listProductsPromo();
    console.log(products);
    res.json(products);
  } catch {
    console.log("asdf");
  }
});

//address
router.post("/cad-address", async (req, res) => {
  try {
    const cadAddressData = req.body;
    console.log(cadAddressData)
    const result = await cadAddress(cadAddressData);
    res.json(result);
  } catch (error) {
    console.error("Error during cad-user:", error);
    res.status(500).json({ error: "Internal server error, erro na routes.js" });
  }
});

router.post("/remove-address", async (req, res) => {
  try {
    const rmAddressData = req.body;
    console.log(rmAddressData)
    const result = await removeAddress(rmAddressData);
    res.json(result);
  } catch (error) {
    console.error("Error during cad-user:", error);
    res.status(500).json({ error: "Internal server error, erro na routes.js" });
  }
});

router.post("/list-address", async (req, res) => {
  try {
    const id = req.body;
    const addresslist = await listUserAddress(id);
    console.log(addresslist)
    res.json(addresslist);
  } catch {
    console.log("asdf");
  }
});


module.exports = router;

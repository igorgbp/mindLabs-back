const express = require("express");
const {
  cadUser,
  removeUser,
  listUsers,
  login,
  listProducts,
  listProductsFavorite,
  listProductsByCategory,
  listUserAddress
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

// product
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

router.post("/list-user-address", async (req, res) => {
  try {
    const id = req.body;
    const addresslist = await listUserAddress(id);
    console.log(addresslist)
    res.json(addresslist);
  } catch {
    console.log("asdf");
  }
});



//payment
router.get("/payment-pix", async (req, res) => {
  try {
    console.log(process.env.TOKEN);
    console.log("dentro da api");
    const requestBody = {
      transaction_amount: 0.1,
      description: "asdf",
      payment_method_id: "pix",
      payer: {
        email: "mariadasdrs0@gmail.com",
        first_name: "igor",
        last_name: "pereira",
        identification: {
          type: "CPF",
          number: "19119119100",
        },
        address: {
          zip_code: "06233200",
          street_name: "Av. das Nações Unidas",
          street_number: "3003",
          neighborhood: "Bonfim",
          city: "Osasco",
          federal_unit: "SP",
        },
      },
    };

    console.log(JSON.stringify(requestBody));
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`, // Adicione o Bearer Token ao cabeçalho Authorization
      },
      body: JSON.stringify(requestBody),
    });

    // console.log("response:", response.point_of_interaction.transaction_data.qr_code_base64);

    const data = await response.json();
    console.log(data.point_of_interaction.transaction_data.qr_code_base64);
    res.json(data.point_of_interaction.transaction_data.qr_code_base64);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

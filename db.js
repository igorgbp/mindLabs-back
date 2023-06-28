const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.IPDB,
  user: "root",
  password: "",
  database: "mindlabs",
});
console.log(process.env.IPDB);
console.log("baguvix");
const query = util.promisify(pool.query).bind(pool);

async function cadUser(data) {
  try {
    await query(
      "INSERT INTO user (first_name, last_name, cpf, username, email, password) VALUES ( ?, ?, ?,?,?,?)",
      [
        data.first_name,
        data.last_name,
        data.cpf,
        data.username,
        data.email,
        data.password,
      ]
    );
    return data;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
async function updateUser(data) {
  try {
    await query(
      "UPDATE user SET first_name =? , last_name = ?,  username = ?,  password=? where id = ?",
      [
        data.first_name,
        data.last_name,
      
        data.username,
        data.password,
 
        data.id
      ]
    );
    return data;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
async function removeUser(data) {
  // print('dbfunction',data)
  try {
    console.log(data);
    const results = await query(
      "DELETE FROM user WHERE username = ? AND password = ?",
      [data.username, data.password]
    );
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
async function listUsers() {
  try {
    const results = await query("SELECT * FROM user");
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

async function login(data) {
  try {
    const results = await query(
      "SELECT * FROM user WHERE username = ? AND password = ?",
      [data.username, data.password]
    );
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

async function listProducts() {
  try {
    const results = await query("SELECT * FROM product");
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
async function listProductsFavorite(data) {
  try {
    const results = await query(
      "SELECT p.* FROM product p JOIN favorite f ON p.id = f.idproduct WHERE f.iduser = ?",
      [data.userId]
    );
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
async function listProductsByCategory(data) {
  try {
    const results = await query("SELECT * FROM product WHERE category = ?", [
      data.category,
    ]);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
async function listUserAddress(data) {
  try {
    const results = await query("SELECT * FROM address WHERE iduser = ?", [
      data.userId,
    ]);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
async function cadAddress(data) {
  try {
    const {number, street, neighborhood, city, state, complement} = data.address;
    await query("INSERT INTO address (iduser, street, number, neighborhood, city, state, complement) VALUES ( ?, ?,?,?,?,?,?)", [
      data.id,
      street ,number , neighborhood,city, state,complement
    ]);
    return data;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

async function removeAddress(data) {
  try {
    console.log('sql', data.iduser)
    await query("delete from address where iduser = ? AND idaddress = ?", [
      data.iduser, 
      data.idaddress
    ]);
    return data;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

async function cadFavorite(data) {
  try {
    await query("INSERT INTO favorite VALUES ( ?, ?)", [
      data.userId,
      data.productId,
    ]);
    return data;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
module.exports = {
  cadUser,
  updateUser,
  removeUser,
  listUsers,
  login,
  listProducts,
  listProductsByCategory,
  listProductsFavorite,
  listUserAddress,
  cadFavorite,
  cadAddress,
  removeAddress
};

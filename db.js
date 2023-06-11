const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "baguvix6",
  database: "mindlabs",
});

const query = util.promisify(pool.query).bind(pool);

async function cadUser(data) {
  try {
    await query(
      "INSERT INTO user (username, email, password) VALUES ( ?, ?, ?)",
      [data.username, data.email, data.password]
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
      console.log(data)
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
    const results = await query(
      "SELECT * FROM product"
    );
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
module.exports = { cadUser, removeUser, listUsers, login, listProducts};

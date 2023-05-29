const mysql = require("mysql");

async function connect() {
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "baguvix6",
    database: "mindlabs",
  });
  global.connection = connection;
  return connection;
}
connect();

async function getUser() {
  const conn = await connect();
  result = conn.query("select * from user", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      // Handle the error appropriately
    } else {
      console.log(results);
      return results
    }
  });
}

async function loginCheck(data) {
  const conn = await connect();
  console.log('lgch',data)
  result = conn.query(`select * from user where username="fff"`, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      // Handle the error appropriately
    } else {
      console.log('logincheck function')
      console.log(typeof results);
      return results
    }
  });
 
}


async function insertUser(user) {
  const conn = await connect();
  console.log(user)
  result = conn.query(
    `insert into user values (${user.id},"${user.username}","${user.email}","${user.password}") `,
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        // Handle the error appropriately
      } else {
        // Process the query results
        console.log("Query results:", results);
      }
    }
  );
  return user

  console.log("inside funciton");
  return result;
}

module.exports = { connection, getUser, insertUser, loginCheck};

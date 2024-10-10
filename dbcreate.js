let mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
  con.query("CREATE DATABASE IF NOT EXISTS deathData", function (err, result) {
    if (err) throw err;
    console.log("Database created ! ");
  });
});

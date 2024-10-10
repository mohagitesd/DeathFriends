let mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "deathData",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Successfully connected to the database");
  let sql =
    "CREATE TABLE IF NOT EXISTS Weapons (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) , damage INT, CanShoot BOOL, projectileSpeed INT, coolDown INT, image VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table successfully created ! ");
  });
});

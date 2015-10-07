var mysql = require("mysql");
var CRUD = require('./crud');

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "jay",
  password: "jay"
});

con.connect(function (err) {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
  CRUD.run(con);
});

con.end(function (err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});

var mysql = require("mysql");
var CRUD = require('./crud');
var trans = require('./commit');
// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "alij",//Wade's ali host 120.25.70.243
  //port : "3306",
  user: "root",
  password: "",//password has been changed , ask Wade to get it
  database:'p2p'
});

con.connect(function (err) {
  if (err) {
    console.log('Error connecting to Db', err);
    return;
  }
  console.log('Connection established');
  CRUD.run(con, function(err, result){
    console.log('crud run end ', err, result);
    trans.run(con, null, function(err, result){
      console.log('trans run end ', err, result);
      process.exit(0);
    });

  });

});

//con.end(function (err) {
//  // The connection is terminated gracefully
//  // Ensures all previously enqueued queries are still
//  // before sending a COM_QUIT packet to the MySQL server.
//});

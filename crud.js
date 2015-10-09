var async = require('async');
module.exports = {
  run: function (con, callback) {
    async.waterfall([
        //query
        function (cb) {
          con.query('SELECT * FROM employees', function (err, rows) {
            if (err) {
              console.log('err', err);
              cb(err);
            }
            console.log('Data received from Db:\n');
            console.log(rows);
            cb(null, rows);
          });
        },
        //create
        function (rows, cb) {
          var employee = {name: 'Winnie', location: 'Australia'};
          con.query('INSERT INTO employees SET ?', employee, function (err, res) {
            if (err) {
              console.log('err', err);
              cb(err);
            }
            console.log('Last insert ID:', res.insertId);
            cb(null, res.insertId);
          });
        },
        //update
        function (insertId, cb) {
          con.query(
            'UPDATE employees SET location = ? Where ID = ?',
            ["South Africa", 5],
            function (err, result) {
              if (err) {
                console.log('err', err);
                cb(err);
              }
              console.log('Changed ' + result.changedRows + ' rows', result);
              cb(null, result);
            }
          );
        },
        //destroy
        function (result, cb) {
          con.query(
            'DELETE FROM employees WHERE id = ?',
            [5],
            function (err, updateResult) {
              if (err) {
                console.log('err', err);
                cb(err);
              }
              console.log('Deleted ' + updateResult.affectedRows + ' rows');
              cb(null, updateResult);
            }
          );

        }
      ],function (err, result) {
        callback(err, result);
      })
  }
};

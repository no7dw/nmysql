var queues = require('mysql-queues');

var async = require('async');
module.exports = {
  /**
   * @param con
   * @param param
   * @param callback
   * @returns {*}
   */
  run: function (con, param, callback) {

    var dodealsql={
      add_employee:"INSERT into employees SET ?",
      update_employee:"UPDATE employees SET location= ? Where ID= ?"
    };
    var sqlParam = {
      add_employee:{name: 'Wade', location: 'Chile'},
      update_employee:['China', 5]
    };
    queues(con, true);
    //开启事务
    var trans = con.startTransaction();
    async.series({
      create: function(cb) { trans.query(dodealsql.add_employee,sqlParam.add_employee , function(err, result){
        console.log('create', err, result);
        cb(err, result);
      }); },
      update: function(cb) { trans.query(dodealsql.update_employee, sqlParam.update_employee , function(err, result){
        console.log('update', err, result);
        cb(err, result);
      });}
    }, function (err, results) {
      if (err) {
        trans.rollback();
        console.log('trans rollback');
        return callback(err);
      }
      else {
        trans.commit();
        console.log('trans commit');
        return callback(null);
      }
    });
    //执行事务
    trans.execute();
    console.log('execute done');

  }
};


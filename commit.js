var async = require('async');
module.exports = {
  /**
   * @param con
   * @param param
   * @param callback
   * @returns {*}
   */
  modifyMoney: function (con, param, callback) {

    var dodealsql={
      add_employee:"insert into employees set ?",
      update_employee:"update employees set location ? Where ID= ?"
    };
    var sqlParam = {
      add_employee:{name: 'Wade', location: 'Chile'},
      update_employee:['China', 6]
    };

    //开启事务
    var trans = con.startTransaction();
    async.series({
      create: function(cb) { trans.query(dodealsql.add_employee,sqlParam.add_employee , cb); },
      update: function(cb) { trans.query(dodealsql.update_employee, sqlParam.update_employee ,cb);},
    }, function (err, results) {
      if (err) {
        trans.rollback();
        return callback(err);
      }
      else {
        trans.commit();
        return callback(null);
      }
    });
    //执行事务
    trans.execute();
    console.log('execute done');
  }
};


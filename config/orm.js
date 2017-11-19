// Import MySQL connection.
var connection = require("../config/connection.js");

var orm = {
  create: function(table, set, callback) {
    var query = "INSERT INTO ?? SET ?";
    var call = connection.query(query, [table, set], function(err, res) {
      if (err) {
        throw err;
      }
      callback(res)
    });
    console.log(call.sql);
  },
  read: function(from, callback) {
    var select, where, groupBy, having, orderBy, limit, command;
    var params = [];
    if (typeof arguments[1] == "object") {
      select = arguments[1].select;
      where = arguments[1].where;
      groupBy = arguments[1].groupBy;
      having = arguments[1].having;
      orderBy = arguments[1].orderBy;
      limit = arguments[1].limit;
      command = arguments[1].query;
      callback = arguments[2];
    } else {
      callback = arguments[1];
    }
    if (command === true) {
      var query = "SELECT " + from;
    } else {
      if (select === undefined) select = "*";
      params.push(select);
      params.push(from);
      var query = "SELECT ?? FROM ??"
      if (where !== undefined) {
        if (typeof where === "string") {
          query += " WHERE " + where
        } else {
          query += " WHERE ?";
          params.push(where);
        }
      }
      if (groupBy !== undefined) {
        query += " GROUP BY ??";
        params.push(groupBy);
      }
      if (having !== undefined) {
        query += " HAVING " + having;
        // params.push(having);
      }
      if (orderBy !== undefined) {
        query += " ORDER BY ??";
        params.push(orderBy);
      }
      if (limit !== undefined) {
        query += " LIMIT ??";
        params.push(limit);
      }
    }
    var call = connection.query(query, params, function(err, res) {
      if (err) throw err;
      callback(res);
    });
    console.log(call.sql);
  },
  update: function(table, set, where, callback) {
    var params = [table];
    var query = "UPDATE ??";
    if (typeof set === "string") {
      query += " SET " + set
    } else {
      query += " SET ?";
      params.push(set);
    }
    if (typeof where === "string") {
      query += " WHERE " + where
    } else {
      query += " WHERE ?";
      params.push(where);
    }
    var call = connection.query(query, params, function(err, res) {
      if (err) {
        throw err;
      };
      callback(res);
    });
    console.log(call.sql);
  },
  delete: function(table, where, callback) {
    var query = "DELETE FROM ?? WHERE ?";
    var call = connection.query(query, [table, where], function(err, res) {
      if (err) throw err;
      callback(res);
    });
    console.log(call.sql);
  }
}

module.exports = orm;
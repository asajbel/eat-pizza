var orm = require("../config/orm.js");

var pizza = {
	all: function(callback) {
		orm.read("pizza", {orderBy: "date"}, function(res){
			callback(res);
		});
	},
	create: function(name, callback){
		orm.create("pizza", {name: name}, function(res) {
			callback(res);
		});
	},
	update: function(changedValueObj, whereObj, callback) {
		orm.update("pizza", changedValueObj, whereObj, function(res){
			callback(res);
		});
	}
}

module.exports = pizza;
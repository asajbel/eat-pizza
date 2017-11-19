var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var pizza = require("../models/pizza.js");

router.get("/", function(req, res) {
	pizza.all(function(data) {
		var hbsObject = {
			pizza: data
		};
		res.render("index", hbsObject);
	});
});

router.post("/api/pizza", function(req, res) {
	pizza.create( req.body.name, function(result) {
		res.json({ id: result.insertId});
	});
});

router.put("/api/pizza/:id", function(req, res) {
	console.log(req.body);
	var devoured = req.body.devoured === true || req.body.devoured === "true";
	pizza.update({devoured: devoured}, {id: req.params.id}, function(result){
		if (result.changedRows == 0) {
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});

module.exports = router;
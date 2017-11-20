$(function() {
	$(".devour").on("click", function(event){
		event.preventDefault();
		var id = event.target.dataset.id;

		var pizza = {
			id: id,
			devoured: true
		};

		$.ajax("/api/pizza/" + id, {
			type: "PUT",
			data: pizza
		}).then( function() {
			console.log("Devoured pizza with id " + id);
			location.reload();
		})
	});

	$("#newPizza").on("submit", function(event) {
		event.preventDefault();
		var pizza = {
			name: event.target.pizzaName.value.trim()
		};

		$.ajax("/api/pizza", {
			type: "POST",
			data: pizza
		}).then(function() {
			console.log("created new pizza " + pizza.name);
			location.reload();
		});
	});
});
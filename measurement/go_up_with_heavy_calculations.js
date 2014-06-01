onmessage = function (event) {

	for (var i = 0; i < 100000000; i++) {
		Math.sqrt(Math.PI);
	}

	postMessage({
		id: event.data.id,
		direction: "up"
	});
};

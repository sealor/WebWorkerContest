onmessage = function (event) {
	postMessage({
		id: event.data.id,
		direction: "up"
	});
};

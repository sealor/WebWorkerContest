var direction;

var x = null;
var y = null;

var state = 1;
var subState = 1;

onmessage = function (event) {
	
	if (state === 1) {
		if (subState === 1) {
			direction = "up";
		} else {
			direction = "right";
		}
		
		subState = subState * -1;
	}
	
	postMessage({
		id: event.data.id,
		direction: direction
	});
};


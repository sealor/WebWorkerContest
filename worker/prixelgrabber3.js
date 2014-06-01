var direction;

var fields = 0;
var deltaX = -1;
var deltaY = -1;

var add = new Array(+2, -2, +1, +1, -2, +2, -1, -1);
var idxX = 2;
var idxY = 0;

onmessage = function (event) {
	
	if (event.data.done === false) {
		deltaX = deltaX + add[idxX];
		deltaY = deltaY + add[idxY];
		
		idxX++;
		idxY++;
		
		if (idxX === add.length) idxX = 0;
		if (idxY === add.length) idxY = 0;
		
		if (deltaX === 0 || deltaY === 0) {
			if (deltaX === -1) {
				direction = "left";
			} else if (deltaX === 1) {
				direction = "right";
			} else if (deltaY === -1) {
				direction = "up";
			} else if (deltaY === 1) {
				direction = "down";
			}
		}
	}
	
	if (deltaX !== 0 && deltaY !== 0) {
		if (fields % 2 === 0) {
			if (deltaX === -1) {
				direction = "left";
			} else {
				direction = "right";
			}
		} else {
			if (deltaY === -1) {
				direction = "up";
			} else {
				direction = "down";
			}
		}
	}
	
	fields++;
	
	postMessage({
		id: event.data.id,
		direction: direction
	});
};


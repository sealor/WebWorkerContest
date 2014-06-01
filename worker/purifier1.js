var direction = null;

var fields = 0;
var deltaX = -1;
var deltaY = -1;

var add = [+2, -2, +1, +1, -2, +2, -1, -1];
var idxX = 2;
var idxY = 0;

var posX = 0;
var posY = 0;
var history = [];
for (var i = -200; i < 200; i++) {
	history[i] = [];
}
var doubleFields = 0;

onmessage = function (event) {

	if (event.data.done === true) {
		if (direction === "right") {
			posX++;
		} else if (direction === "left") {
			posX--;
		} else if (direction === "up") {
			posY--;
		} else if (direction === "down") {
			posY++;
		}

		if (history[posX][posY] === true) {
			doubleFields++;
		} else {
			doubleFields = 0;
		}

		history[posX][posY] = true;
	}

	if (event.data.done === false || (doubleFields > 17 && doubleFields % 7 === 0)) {
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


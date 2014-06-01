var direction = null;

var fields = 0;
var deltaX = -1;
var deltaY = -1;

var add = [+2, -2, +1, +1, -2, +2, -1, -1];
var idxX = 2;
var idxY = 0;

var posX = 0;
var posY = 0;
var history = {};
for (var i = -100; i < 100; i++) {
	history[i] = {};
}
var doubleFields = 0;
var doubleFieldFactor = 3;

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

		if (history[posX][posY] === 1) {
			doubleFields++;
		} else {
			doubleFields = 0;
			doubleFieldFactor = 3;
		}

		history[posX][posY] = 1;
	}
	
	if (event.data.done === false) {
		var wrongPosX = posX;
		var wrongPosY = posY;
		
		if (direction === "right") {
			wrongPosX = posX + 1;
		} else if (direction === "left") {
			wrongPosX = posX - 1;
		} else if (direction === "up") {
			wrongPosY = posY - 1;
		} else if (direction === "down") {
			wrongPosY = posY + 1;
		}
		
		history[wrongPosX][wrongPosY] = 2;
	}

	if (event.data.done === false || doubleFields > doubleFieldFactor) {
		if (doubleFields > doubleFieldFactor) {
			doubleFieldFactor = doubleFieldFactor * 3;
		}

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
	
	if (fields === 1000) {
		console.log("1000");
		console.log(JSON.stringify(history));
		asd;
	}
	
	postMessage({
		id: event.data.id,
		direction: direction
	});
};


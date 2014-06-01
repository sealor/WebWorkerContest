var dirStrings = [null, "down", null, "left", null, "up", null, "right"];
var dirSwitch = true;
var postDir = null;

var deltaX = [-1, +0, +1, +1, +1, +0, -1, -1];
var deltaY = [-1, -1, -1, +0, +1, +1, +1, +0];

var turtleX = 100;
var turtleY = 100;
var turtleDir = 0;

var history = [];
for (var i = 0; i < 200; i++) {
	history[i] = new Array(200);
}
var doubleFields = 0;
var doubleFieldFactor = 2;

onmessage = function (event) {

	if (event.data.done === true) {
		turtleX += deltaX[postDir];
		turtleY += deltaY[postDir];

		if (history[turtleX][turtleY] === true) {
			doubleFields++;

			if (doubleFields > doubleFieldFactor) {
				doubleFieldFactor = doubleFieldFactor * 2;

				turtleDir = (turtleDir + 5) % 8;
				postDir = turtleDir;
			}
		} else {
			history[turtleX][turtleY] = true;
			doubleFields = 0;
			doubleFieldFactor = 3;
		}
	} else if (event.data.done === false) {
		turtleDir = (turtleDir + 5) % 8;
		postDir = turtleDir;
	}

	switch(turtleDir) {
		case 0: postDir = (dirSwitch) ? 1 : 7; break;
		case 2: postDir = (dirSwitch) ? 1 : 3; break;
		case 4: postDir = (dirSwitch) ? 3 : 5; break;
		case 6: postDir = (dirSwitch) ? 5 : 7; break;
	}
	dirSwitch = !dirSwitch;

	postMessage({
		id: event.data.id,
		direction: dirStrings[postDir]
	});
}


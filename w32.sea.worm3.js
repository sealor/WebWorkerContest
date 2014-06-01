var dirStrings = [null, "down", null, "left", null, "up", null, "right"];
var dirSwitch = true;
var postDir = null;

var deltaX = [-1, +0, +1, +1, +1, +0, -1, -1];
var deltaY = [-1, -1, -1, +0, +1, +1, +1, +0];

var turtleX = 100;
var turtleY = 100;
var turtleDir = 0;

var history = new Array(200);
for (var i = 0; i < 200; i++) {
	history[i] = new Array(200);
}

var collisions = new Array();

var doubleFields = 0;
var doubleFieldFactor = 7;
var fields = 0;

onmessage = function (event) {

	if (event.data.done === true) {
		turtleX += deltaX[postDir];
		turtleY += deltaY[postDir];

		if (turtleX < 0 || turtleY < 0) {
			asad;
		}

		if (history[turtleX][turtleY] === true) {
			doubleFields++;

			if (doubleFields > doubleFieldFactor) {
				doubleFieldFactor = doubleFieldFactor * 7;

				turtleDir = (turtleDir + 5) % 8;
				postDir = turtleDir;
			}
		} else {
			history[turtleX][turtleY] = true;
			doubleFields = 0;
			doubleFieldFactor = 3;
		}
	} else if (event.data.done === false) {
		collisions.push([turtleX + deltaX[postDir], turtleY + deltaY[postDir]]);

		turtleDir = (turtleDir + 5) % 8;
		postDir = turtleDir;
	}

	if (fields === 1200) {
		console.log(JSON.stringify(history));
		console.log(JSON.stringify(collisions));
		asd;
	}
	fields++;

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


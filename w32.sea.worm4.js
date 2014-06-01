var dirStrings = [null, "down", null, "left", null, "up", null, "right"];
var dirSwitch = true;
var postDir = null;

var deltaX = [-1, +0, +1, +1, +1, +0, -1, -1];
var deltaY = [-1, -1, -1, +0, +1, +1, +1, +0];

var turtleX = 102;
var turtleY = 102;
var turtleDir = 0;

var history = new Array(204);
for (var i = 0; i < 204; i++) {
	history[i] = new Array(204);
}

var collisions = new Array();

var doubleFields = 0;
var doubleFieldFactor = 3;
var fields = 0;
var stage = 1;

var walkerX = 0;
var walkerY = 0;
var walkerDir = 1;

var border = new Array(204);
for (var i = 0; i < 204; i++) {
	border[i] = new Array(204);
}

function buildBorder() {
	for (var i = 0; i < collisions.length; i++) {
		var startX = collisions[i][0];
		var startY = collisions[i][1];

		if (border[startX][startY] !== true) {
			walkerX = startX;
			walkerY = startY;

			do {
				while (history[walkerX + deltaX[walkerDir]][walkerY + deltaY[walkerDir]] === true) {
					walkerDir = (walkerDir + 1) % 8;
				}
				while (history[walkerX + deltaX[walkerDir]][walkerY + deltaY[walkerDir]] !== true) {
					walkerDir = (walkerDir + 1) % 8;
				}

				walkerDir = (walkerDir + 7) % 8;

				walkerX += deltaX[walkerDir];
				walkerY += deltaY[walkerDir];

				border[walkerX][walkerY] = true;
			} while (walkerX !== startX || walkerY !== startY);
		}
	}
}

onmessage = function (event) {

	if (stage === 1) {
		if (event.data.done === true) {
			turtleX += deltaX[postDir];
			turtleY += deltaY[postDir];

			if (history[turtleX][turtleY] === true) {
				doubleFields++;

				if (doubleFields > doubleFieldFactor) {
					doubleFieldFactor = doubleFieldFactor * 3;

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

			if (fields > 1200) {
				buildBorder();
				walkerX = turtleX;
				walkerY = turtleY;
				walkerDir = 1;
				while (border[walkerX + deltaX[walkerDir]][walkerY + deltaY[walkerDir]] !== true) {
					walkerDir = (walkerDir + 2) % 8;
				}
				walkerDir = (walkerDir + 6) % 8;
				stage = 2;
			} else {
				turtleDir = (turtleDir + 5) % 8;
				postDir = turtleDir;
			}
		}

		switch(turtleDir) {
			case 0: postDir = (dirSwitch) ? 1 : 7; break;
			case 2: postDir = (dirSwitch) ? 1 : 3; break;
			case 4: postDir = (dirSwitch) ? 3 : 5; break;
			case 6: postDir = (dirSwitch) ? 5 : 7; break;
		}
		dirSwitch = !dirSwitch;
	}

	if (stage === 2) {
		walkerDir = (walkerDir + 2) % 8;
		if (border[walkerX + deltaX[walkerDir]][walkerY + deltaY[walkerDir]] === true) {
			walkerDir = (walkerDir + 6) % 8;

			if (border[walkerX + deltaX[walkerDir]][walkerY + deltaY[walkerDir]] === true) {
				walkerDir = (walkerDir + 6) % 8;

				if (border[walkerX + deltaX[walkerDir]][walkerY + deltaY[walkerDir]] === true) {
					walkerDir = (walkerDir + 6) % 8;

					if (border[walkerX + deltaX[walkerDir]][walkerY + deltaY[walkerDir]] === true) {
/*						console.log(JSON.stringify(history));
						console.log(JSON.stringify(border));
						console.log(JSON.stringify(collisions));
						console.log(JSON.stringify(walkerX + ", " + walkerY));
						console.log("err");
						sad;*/
					}
				}
			}
		}

		// zubauen
		var check0Dir = (walkerDir + 7) % 8;
		var check7Dir = (walkerDir + 6) % 8;
		var check6Dir = (walkerDir + 5) % 8;
		var check3Dir = (walkerDir + 2) % 8;
		if (border[walkerX + deltaX[check0Dir]][walkerY + deltaY[check0Dir]] !== true
			&& border[walkerX + deltaX[check7Dir]][walkerY + deltaY[check7Dir]] !== true
			&& border[walkerX + deltaX[check6Dir]][walkerY + deltaY[check6Dir]] !== true
			&& border[walkerX + deltaX[check3Dir]][walkerY + deltaY[check3Dir]] === true) {
			border[walkerX][walkerY] = true;
		}

		var check3Dir = (walkerDir + 2) % 8;
		var check5Dir = (walkerDir + 4) % 8;
		var check7Dir = (walkerDir + 6) % 8;
		if (border[walkerX + deltaX[check3Dir]][walkerY + deltaY[check3Dir]] === true
			&& border[walkerX + deltaX[check5Dir]][walkerY + deltaY[check5Dir]] === true
			&& border[walkerX + deltaX[check7Dir]][walkerY + deltaY[check7Dir]] === true) {
			border[walkerX][walkerY] = true;
		}

		walkerX += deltaX[walkerDir];
		walkerY += deltaY[walkerDir];
		postDir = walkerDir;
	}

	fields++;

	postMessage({
		id: event.data.id,
		direction: dirStrings[postDir]
	});
}


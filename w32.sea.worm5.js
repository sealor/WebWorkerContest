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

var border = new Array(204);
for (var i = 0; i < 204; i++) {
	border[i] = new Array(204);
}

function buildBorder() {
	var turtleX, turtleY;
	var turtleDir = 1;

	for (var i = 0; i < collisions.length; i++) {
		var startX = collisions[i][0];
		var startY = collisions[i][1];

		if (border[startX][startY] !== true) {
			turtleX = startX;
			turtleY = startY;

			do {
				while (history[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] === true) {
					turtleDir = (turtleDir + 1) % 8;
				}
				while (history[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] !== true) {
					turtleDir = (turtleDir + 1) % 8;
				}

				turtleDir = (turtleDir + 7) % 8;

				turtleX += deltaX[turtleDir];
				turtleY += deltaY[turtleDir];

				border[turtleX][turtleY] = true;
			} while (turtleX !== startX || turtleY !== startY);

			do {
				while (history[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] === true) {
					turtleDir = (turtleDir + 1) % 8;
				}
				while (history[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] !== true) {
					turtleDir = (turtleDir + 1) % 8;
				}

				turtleDir = (turtleDir + 7) % 8;

				var checkDir = (turtleDir + 2) % 8;
				var checkX = turtleX + deltaX[checkDir];
				var checkY = turtleY + deltaY[checkDir];

				var check0Dir = (checkDir + 7) % 8;
				var check1Dir = checkDir;
				var check2Dir = (checkDir + 1) % 8;

				if (border[checkX + deltaX[check0Dir]][checkY + deltaY[check0Dir]] !== true
					&& border[checkX + deltaX[check1Dir]][checkY + deltaY[check1Dir]] !== true
					&& border[checkX + deltaX[check2Dir]][checkY + deltaY[check2Dir]] !== true) {
					border[checkX][checkY] = true;
				}

				turtleX += deltaX[turtleDir];
				turtleY += deltaY[turtleDir];

				border[turtleX][turtleY] = true;
			} while (turtleX !== startX || turtleY !== startY);
		}
	}
}


onmessage = function (event) {

	if (stage === 1 || stage === 4) {
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
			if (stage === 1) {
				collisions.push([turtleX + deltaX[postDir], turtleY + deltaY[postDir]]);

				if (fields > 1200) {
					stage = 2;
				}
			}

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
	}

	if (stage === 2) {
		buildBorder();
		turtleDir = 1;
		while (border[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] !== true) {
			turtleDir = (turtleDir + 2) % 8;
		}
		turtleDir = (turtleDir + 6) % 8;
		stage = 3;
	}

	if (stage === 3) {
		turtleDir = (turtleDir + 2) % 8;
		if (border[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] === true) {
			turtleDir = (turtleDir + 6) % 8;

			if (border[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] === true) {
				turtleDir = (turtleDir + 6) % 8;

				if (border[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] === true) {
					turtleDir = (turtleDir + 6) % 8;

					if (border[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] === true) {
						history = border;
						stage = 4;
					}
				}
			}
		}

		// zubauen
		var check0Dir = (turtleDir + 7) % 8;
		var check7Dir = (turtleDir + 6) % 8;
		var check6Dir = (turtleDir + 5) % 8;
		var check3Dir = (turtleDir + 2) % 8;
		if (border[turtleX + deltaX[check0Dir]][turtleY + deltaY[check0Dir]] !== true
			&& border[turtleX + deltaX[check7Dir]][turtleY + deltaY[check7Dir]] !== true
			&& border[turtleX + deltaX[check6Dir]][turtleY + deltaY[check6Dir]] !== true
			&& border[turtleX + deltaX[check3Dir]][turtleY + deltaY[check3Dir]] === true) {
			border[turtleX][turtleY] = true;
		}

		var check3Dir = (turtleDir + 2) % 8;
		var check5Dir = (turtleDir + 4) % 8;
		var check7Dir = (turtleDir + 6) % 8;
		if (border[turtleX + deltaX[check3Dir]][turtleY + deltaY[check3Dir]] === true
			&& border[turtleX + deltaX[check5Dir]][turtleY + deltaY[check5Dir]] === true
			&& border[turtleX + deltaX[check7Dir]][turtleY + deltaY[check7Dir]] === true) {
			border[turtleX][turtleY] = true;
		}

		turtleX += deltaX[turtleDir];
		turtleY += deltaY[turtleDir];
		postDir = turtleDir;
	}

	fields++;

	postMessage({
		id: event.data.id,
		direction: dirStrings[postDir]
	});
}


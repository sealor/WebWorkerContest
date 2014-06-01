var deltaX = [-1, +0, +1, +1, +1, +0, -1, -1];
var deltaY = [-1, -1, -1, +0, +1, +1, +1, +0];

var turtleX = 1;
var turtleY = 5;
var turtleDir = 1;

function walkOnBorderStart(border) {
	while (border[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] !== true) {
		turtleDir = (turtleDir + 2) % 8;
	}
	turtleDir = (turtleDir + 6) % 8;
}

function walkOnBorder(border) {
	turtleDir = (turtleDir + 2) % 8;
	if (border[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] === true) {
		turtleDir = (turtleDir + 6) % 8;

		if (border[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] === true) {
			turtleDir = (turtleDir + 6) % 8;

			if (border[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] === true) {
				turtleDir = (turtleDir + 6) % 8;

				if (border[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] === true) {
					turtleDir = null;
					return;
				}
			}
		}
	}
}

test("BorderWalkTest: Walk the line", function() {
	turtleX = 1;
	turtleY = 5;
	turtleDir = 1;

	var border = "" +
		"  1     \n" +
		"  1     \n" +
		"  1111  \n" +
		"     1  \n" +
		"  1111  \n" +
		"  1     \n" +
		"        \n";
	border = convertToField(border);

	for (var i = 0; i < 10; i++) {
		walkOnBorder(border);

		turtleX += deltaX[turtleDir];
		turtleY += deltaY[turtleDir];
	}

	equal(turtleX, 1);
	equal(turtleY, 1);
});

test("BorderWalkTest: Walk the cycle", function() {
	turtleX = 1;
	turtleY = 1;
	turtleDir = 1;

	var border = "" +
		"          \n" +
		"  111111  \n" +
		"   11     \n" +
		"    11    \n" +
		"          \n" +
		"          \n";
	border = convertToField(border);

	for (var i = 0; i < 24; i++) {
		walkOnBorder(border);

		turtleX += deltaX[turtleDir];
		turtleY += deltaY[turtleDir];
	}

	equal(turtleX, 1);
	equal(turtleY, 1);
});

test("BorderWalkTest: Walk around block", function() {
	turtleX = 3;
	turtleY = 1;
	turtleDir = 1;

	var border = "" +
		"     \n" +
		" 11  \n" +
		"     \n";
	border = convertToField(border);

	walkOnBorderStart(border);
	for (var i = 0; i < 10; i++) {
		walkOnBorder(border);

		turtleX += deltaX[turtleDir];
		turtleY += deltaY[turtleDir];
	}

	equal(turtleX, 3);
	equal(turtleY, 1);
});


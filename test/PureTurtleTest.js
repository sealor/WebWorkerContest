var deltaX = [-1, +0, +1, +1, +1, +0, -1, -1];
var deltaY = [-1, -1, -1, +0, +1, +1, +1, +0];

var turtleX = 1;
var turtleY = 5;
var turtleDir = 0;

function pureWalk(history) {
	while (history[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] === true) {
		turtleDir = (turtleDir + 1) % 8;
	}
	while (history[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] !== true) {
		turtleDir = (turtleDir + 1) % 8;
	}

	turtleDir = (turtleDir + 7) % 8;

	turtleX += deltaX[turtleDir];
	turtleY += deltaY[turtleDir];
}

test("PureTurtleTest: Walk the line", function() {
	turtleX = 1;
	turtleY = 5;
	turtleDir = 0;

	var history = "" +
		"  1     \n" +
		"  1     \n" +
		"  1111  \n" +
		"     1  \n" +
		"  1111  \n" +
		"  1     \n" +
		"        \n";
	history = convertToField(history);

	for (var i = 0; i < 8; i++) {
		pureWalk(history);
	}

	equal(turtleX, 1);
	equal(turtleY, 1);
});

test("PureTurtleTest: Walk the cycle", function() {
	turtleX = 1;
	turtleY = 1;
	turtleDir = 0;

	var history = "" +
		"          \n" +
		"  111111  \n" +
		"   11     \n" +
		"    11    \n" +
		"          \n" +
		"          \n";
	history = convertToField(history);

	for (var i = 0; i < 16; i++) {
		pureWalk(history);
	}

	equal(turtleX, 1);
	equal(turtleY, 1);
});


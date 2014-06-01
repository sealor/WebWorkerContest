var deltaX = [-1, +0, +1, +1, +1, +0, -1, -1];
var deltaY = [-1, -1, -1, +0, +1, +1, +1, +0];

var turtleX = 1;
var turtleY = 5;
var turtleDir = 1;

function fillWalkStart(border) {
	while (border[turtleX + deltaX[turtleDir]][turtleY + deltaY[turtleDir]] !== true) {
		turtleDir = (turtleDir + 2) % 8;
	}
	turtleDir = (turtleDir + 6) % 8;
}

function fillWalk(border) {
	// rechts gehen, wenn möglich
	// gerade gehen, wenn möglich
	// links gehen, wenn möglich
	// sonst fertig!

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

function fillSpace(border) {
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
}

test("fillTurtleTest: Walk the line", function() {
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
		fillWalk(border);

		turtleX += deltaX[turtleDir];
		turtleY += deltaY[turtleDir];
	}

	equal(turtleX, 1);
	equal(turtleY, 1);
});

test("fillTurtleTest: Walk the cycle", function() {
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
		fillWalk(border);

		turtleX += deltaX[turtleDir];
		turtleY += deltaY[turtleDir];
	}

	equal(turtleX, 1);
	equal(turtleY, 1);
});

test("fillTurtleTest: Walk around block", function() {
	turtleX = 3;
	turtleY = 1;
	turtleDir = 1;

	var border = "" +
		"     \n" +
		" 11  \n" +
		"     \n";
	border = convertToField(border);

	fillWalkStart(border);
	for (var i = 0; i < 10; i++) {
		fillWalk(border);

		turtleX += deltaX[turtleDir];
		turtleY += deltaY[turtleDir];
	}

	equal(turtleX, 3);
	equal(turtleY, 1);
});

test("fillTurtleTest: fill line", function() {
	turtleX = 7;
	turtleY = 1;
	turtleDir = 1;

	var border = "" +
		" 11    1 \n" +
		"1  1  1 1\n" +
		" 1  1 1 1\n" +
		"  1  11 1\n" +
		"   1  1 1\n" +
		"    1   1\n" +
		"    11111\n";
	border = convertToField(border);

	fillWalkStart(border);
	for (var i = 0; i < 50 && turtleDir !== null; i++) {
		fillWalk(border);

		if (turtleDir !== null) {
			fillSpace(border);

			turtleX += deltaX[turtleDir];
			turtleY += deltaY[turtleDir];
		}
	}
	border[turtleX][turtleY] = true;

	var fullBorder = "\n" +
		" 11    1\n" +
		"1111  111\n" +
		" 1111 111\n" +
		"  1111111\n" +
		"   111111\n" +
		"    11111\n" +
		"    11111\n";

	equal(convertToText(border), fullBorder);
});

test("fillTurtleTest: fill rectangles", function() {
	turtleX = 1;
	turtleY = 4;
	turtleDir = 1;

	var border = "" +
		"         1111 \n" +
		"        1    1\n" +
		"        1    1\n" +
		" 11111111    1\n" +
		"1            1\n" +
		"1     111 111\n" +
		"1     1 1 1\n" +
		"1     1 1 1111111111111111\n" +
		"1     1 1                 1\n" +
		"1     1 1                 1\n" +
		"1     1 1                 1\n" +
		"1     1 1                 1\n" +
		"1     1 1                 1\n" +
		" 11111   11111111111111111 \n";

	border = convertToField(border);
	var vis = convertToText(border);

	fillWalkStart(border);
	for (var i = 0; i < 500 && turtleDir !== null; i++) {
		fillWalk(border);

		if (turtleDir !== null) {
			fillSpace(border);
			vis = convertToText(border);
//			console.log(vis);

			turtleX += deltaX[turtleDir];
			turtleY += deltaY[turtleDir];
		}
	}
	border[turtleX][turtleY] = true;

	var fullBorder = "\n" +
		"         1111\n" +
		"        111111\n" +
		"        111111\n" +
		" 1111111111111\n" +
		"11111111111111\n" +
		"1111111111111\n" +
		"1111111 111\n" +
		"1111111 111111111111111111\n" +
		"1111111 1111111111111111111\n" +
		"1111111 1111111111111111111\n" +
		"1111111 1111111111111111111\n" +
		"1111111 1111111111111111111\n" +
		"1111111 1111111111111111111\n" +
		" 11111   11111111111111111\n";

	equal(convertToText(border), fullBorder);
});


test("fillTurtleTest: fill triangle", function() {
	turtleX = 1;
	turtleY = 4;
	turtleDir = 1;

	var border = "" +
		" 111111111111 \n" +
		"1            1\n" +
		"1            1\n" +
		"1            1\n" +
		"1            1\n" +
		"1            1\n" +
		"1            1\n" +
		"1            1\n" +
		"1            1\n" +
		"1            1\n" +
		" 1111   11111 \n" +
		"    1   1 \n" +
		"    1   1 \n" +
		"   1     1 \n" +
		"  1       1 \n" +
		" 1         1 \n" +
		"1           1\n" +
		" 11111111111 \n";

	border = convertToField(border);
	var vis = convertToText(border);

	fillWalkStart(border);
	for (var i = 0; i < 500 && turtleDir !== null; i++) {
		fillWalk(border);

		if (turtleDir !== null) {
			fillSpace(border);
			vis = convertToText(border);
//			console.log(vis);

			turtleX += deltaX[turtleDir];
			turtleY += deltaY[turtleDir];
		}
	}
	border[turtleX][turtleY] = true;

	var fullBorder = "\n" +
		" 111111111111\n" +
		"11111111111111\n" +
		"11111111111111\n" +
		"11111111111111\n" +
		"11111111111111\n" +
		"11111111111111\n" +
		"11111111111111\n" +
		"11111111111111\n" +
		"11111111111111\n" +
		"11111111111111\n" +
		" 111111111111\n" +
		"    11111\n" +
		"    11111\n" +
		"   1111111\n" +
		"  111111111\n" +
		" 11111111111\n" +
		"1111111111111\n" +
		" 11111111111\n";

	equal(convertToText(border), fullBorder);
});

test("fillTurtleTest: fill small rectangle", function() {
	turtleX = 1;
	turtleY = 2;
	turtleDir = 1;

	var border = "" +
		" 1 \n" +
		"1 1\n" +
		"1 1\n" +
		"1 1\n" +
		"1 1\n" +
		"1 1\n" +
		"1 1 \n" +
		"1  1\n" +
		"1  1\n" +
		" 11 \n";

	border = convertToField(border);
	var vis = convertToText(border);

	fillWalkStart(border);
	for (var i = 0; i < 500 && turtleDir !== null; i++) {
		fillWalk(border);

		if (turtleDir !== null) {
			fillSpace(border);
			vis = convertToText(border);
			// console.log(vis);

			turtleX += deltaX[turtleDir];
			turtleY += deltaY[turtleDir];
		}
	}
	border[turtleX][turtleY] = true;

	var fullBorder = "\n" +
		" 1\n" +
		"111\n" +
		"111\n" +
		"111\n" +
		"111\n" +
		"111\n" +
		"111\n" +
		"1  1\n" +
		"11 1\n" +
		" 11\n";

	equal(convertToText(border), fullBorder);
});

test("fillTurtleTest: fill labyrinth", function() {
	turtleX = 1;
	turtleY = 2;
	turtleDir = 1;

	var border = "" +
		"        1 \n" +
		" 111 111 1\n" +
		"1   1    1\n" +
		"1      11 \n" +
		"1  1111 \n" +
		" 1  1\n" +
		"  11 \n";

	border = convertToField(border);
	var vis = convertToText(border);

	fillWalkStart(border);
	for (var i = 0; i < 500 && turtleDir !== null; i++) {
		fillWalk(border);

		if (turtleDir !== null) {
			fillSpace(border);
			vis = convertToText(border);
			// console.log(vis);

			turtleX += deltaX[turtleDir];
			turtleY += deltaY[turtleDir];
		}
	}
	border[turtleX][turtleY] = true;

	var fullBorder = "\n" +
		"        1\n" +
		" 111 11111\n" +
		"11111  111\n" +
		"11111 111\n" +
		"1111111\n" +
		" 1111\n" +
		"  11\n";

	equal(convertToText(border), fullBorder);
});


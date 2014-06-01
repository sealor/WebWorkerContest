test("Walk the line", function() {
	var walker = new Walker(1, 5);

	var field = "" +
		"  1\n" +
		"  1\n" +
		"  1111\n" +
		"     1\n" +
		"  1111\n" +
		"  1\n" +
		"  \n";
	field = convertToField(field);

	function turnUntil1(walker) {
		var turtle = walker.turtle;
		turtle.forward(1);
		var continuingTurn = field[turtle.x][turtle.y] === true;
		turtle.forward(-1);
		return continuingTurn;
	}

	function turnUntilNot1(walker) {
		var turtle = walker.turtle;
		turtle.forward(1);
		var continuingTurn = field[turtle.x][turtle.y] !== true;
		turtle.forward(-1);
		return continuingTurn;
	}

	function walkTheLine(walker) {
		var turtle = walker.turtle;

		if (turtle.x < 0 || turtle.x > 10 || turtle.y < 0 || turtle.y > 10) {
			return false;
		}

		walker.turnWhile(turnUntil1);
		walker.turnWhile(turnUntilNot1);
		turtle.turn(-1);

		return true;
	}

	walker.forwardWhile(walkTheLine);

	equal(walker.turtle.x, 2);
	equal(walker.turtle.y, -1);
});

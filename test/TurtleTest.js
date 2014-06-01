test("Turtle forward", function() {
	var turtle = new Turtle(1, 1);
	turtle.forward(1);

	equal(turtle.x, 0);
	equal(turtle.y, 0);

	turtle.forward(10);

	equal(turtle.x, -10);
	equal(turtle.y, -10);
});

test("Turtle turn", function() {
	var turtle = new Turtle(0, 0);

	turtle.turn(5);
	turtle.turn(-5);

	equal(turtle.direction, 0);
});

test("Turtle cycle walk", function() {
	var turtle = new Turtle(0, 0);

	turtle.turn(1);
	turtle.forward(1);

	equal(turtle.x, +0);
	equal(turtle.y, -1);

	turtle.turn(1);
	turtle.forward(1);

	equal(turtle.x, +1);
	equal(turtle.y, -2);

	turtle.turn(1);
	turtle.forward(1);

	equal(turtle.x, +2);
	equal(turtle.y, -2);

	for (var i = 0; i < 5; i++) {
		turtle.turn(1);
		turtle.forward(1);
	}

	equal(turtle.x, 0);
	equal(turtle.y, 0);
});

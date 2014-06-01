function isDefined(obj) {
	return typeof obj !== 'undefined';
};

// Turtle class
function Turtle(x, y) {
	this.x = x;
	this.y = y;

	this.direction = 0;

	this.deltaX = [-1, +0, +1, +1, +1, +0, -1, -1];
	this.deltaY = [-1, -1, -1, +0, +1, +1, +1, +0];
};

Turtle.prototype.forward = function(steps) {
	this.x = this.x + steps * this.deltaX[this.direction];
	this.y = this.y + steps * this.deltaY[this.direction];
};

Turtle.prototype.turn = function(steps) {
	this.direction = (this.direction + steps + 1024) % 8;
};

// Walker class
function Walker(x, y) {
	this.turtle = new Turtle(x, y);
};

Walker.prototype.forwardWhile = function(fowardConditionFunc) {
	while(fowardConditionFunc(this)) {
		this.turtle.forward(1);
	}
};

Walker.prototype.turnWhile = function(turnConditionFunc) {
	while(turnConditionFunc(this)) {
		this.turtle.turn(1);
	}
};

// main program
var directionStrings = [null, "up", null, "right", null, "down", null, "left", null];
var turtle = new Turtle(0, 0);
turtle.deltaX = [-1, +0, +1, -1, +1, +0, -1, +1];
turtle.deltaY = [-1, +1, -1, +0, +1, -1, +1, +0];
var postDirection = turtle.direction;
var directionSwitch = false;
var history = {};
for (var i = -102; i < 102; i++) {
	history[i] = {};
}
var doubleFields = 0;
var doubleFieldFactor = 3;

onmessage = function (event) {

	if (event.data.done === true) {
		var tempDirection = turtle.direction;
		turtle.direction = postDirection;
		turtle.forward(1);
		turtle.direction = tempDirection;

		console.log(turtle.x + ", " + turtle.y);

		if (history[turtle.x][turtle.y] === true) {
			doubleFields++;
		} else {
			doubleFields = 0;
			doubleFieldFactor = 3;
		}

		history[turtle.x][turtle.y] = true;
	}

	if (event.data.done === false || doubleFields > doubleFieldFactor) {
		if (doubleFields > doubleFieldFactor) {
			doubleFieldFactor = doubleFieldFactor * 3;
		}

		turtle.turn(1);
	}

	postDirection = turtle.direction;
	if (postDirection === 0) {
		postDirection = (directionSwitch === true ? 7 : 1);
	} else if (postDirection === 2) {
		postDirection = (directionSwitch === true ? 1 : 3);
	} else if (postDirection === 4) {
		postDirection = (directionSwitch === true ? 3 : 5);
	} else if (postDirection === 6) {
		postDirection = (directionSwitch === true ? 5 : 7);
	}
	directionSwitch = !directionSwitch;

	postMessage({
		id: event.data.id,
		direction: directionStrings[postDirection]
	});
};

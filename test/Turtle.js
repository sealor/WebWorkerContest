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

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

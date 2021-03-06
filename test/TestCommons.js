function isDefined(obj) {
	return typeof obj !== 'undefined';
};

function convertToField(text) {
	var field = [];
	
	var x = 0, y = 0;
	for (var i = 0; i < text.length; i++) {
		if (text.charAt(i) === "\n") {
			x = 0;
			y++;
		} else {
			if (!isDefined(field[x])) {
				field[x] = [];
			}

			if (text.charAt(i) === "1") {
				field[x][y] = true;
			}
			x++;
		}
	}
	
	return field;
};

function convertToText(field) {
	var revField = [];
	for (var x = 0; x < field.length; x++) {
		for (var y = 0; field[x] && y < field[x].length; y++) {
			if (field[x][y] === true) {
				if (!isDefined(revField[y])) {
					revField[y] = [];
				}
				revField[y][x] = true;
			}
		}
	}
	field = revField;

	var text = "\n";
	for (var x = 0; x < field.length; x++) {
		for (var y = 0; field[x] && y < field[x].length; y++) {
			if (field[x][y] === true) {
				text += "1";
			} else {
				text += " ";
			}
		}
		text += "\n";
	}
	return text;
};


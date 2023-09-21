const gameBoard = {
	board: [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	],

	checkWinner: () => {
		// Check for a winner in the rows
		for (let i = 0; i < 3; i++) {
			if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
				return board[i][0];
			}
		}

		// Check for a winner in the columns
		for (let i = 0; i < 3; i++) {
			if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
				return board[0][i];
			}
		}

		// Check for a winner in the diagonals
		if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
			return board[0][0];
		}

		if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
			return board[0][2];
		}

		// No winner yet
		return null;
	},
};

const player = function (name, marker) {
	return { name, marker };
};

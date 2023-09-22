//
//Global Variables
//

const playerSelectionForm = document.getElementsByTagName("form");
const gameBoard = Array.from(document.querySelectorAll("td"));

//
//Global Functions
//

function startGame() {}

function coinFlip() {
	if (Math.random() < 0.5) {
		return;
	}
}

//
//Modules
//

const boardData = (() => {
	let board = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	const placeMarker = (playerChoice) => {
		board[Math.floor(playerChoice / 3)][
			playerChoice <= 2
				? playerChoice
				: function (playerChoice) {
						if (playerChoice <= 5) {
							return playerChoice - 3;
						} else {
							return playerChoice - 6;
						}
				  }
		];
	};

	const checkWinner = () => {
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
	};

	return { board, checkWinner };
})();

//
//Factory Functions
//

const player = (name, marker) => {
	const playerChoice = (element) => {
		return gameBoard.indexOf(element);
	};

	return { name, marker, playerChoice };
};

let jeff = player("jeff", "x");

//
//Event Listeners
//

gameBoard.forEach((element) => {
	element.addEventListener("click", () => jeff.playerChoice(element));
});

window.addEventListener("load");

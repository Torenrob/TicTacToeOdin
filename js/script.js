//
//Global Variables
//↓

const coinFlipBox = document.getElementById("coinFlipContainer");
const gameBoard = Array.from(document.querySelectorAll("td"));
const submitBtn = document.getElementById("submitBtn");
const playerSection = document.getElementsByTagName("section");
const turnKeeper = document.getElementById("turnKeeper");
const winnerBox = document.getElementById("gameResult");
const flipBoxMess = document.getElementById("flipBoxMessage");
let playBtn = null;
let replayBtn = null;
let playSelectForm = null;
let player1 = null;
let player2 = null;
let currentPlayer = null;

//↑
//Global Variables
//

//
//Global Functions
//↓

function startGame(firstPlayer) {
	coinFlipBox.style.visibility = "hidden";
	turnKeeper.style.visibility = "visible";
	turnKeeper.children[1].innerText = currentPlayer.name;
}

function coinFlip() {
	if (Math.random() < 0.5) {
		return;
	}
}

function findGridIndex(playerChoice) {
	if (playerChoice <= 5) {
		return playerChoice - 3;
	} else {
		return playerChoice - 6;
	}
}

function waitForClick(buttonId) {
	return new Promise((resolve, reject) => {
		const button = document.getElementById(buttonId);
		button.addEventListener("click", () => {
			resolve();
		});
	});
}

function initCoinFlip() {
	playSelectForm = document.getElementsByTagName("form");
	player1 = player(
		playSelectForm[0][0].value,
		playSelectForm[0][1].value.toUpperCase()
	);
	player2 = player(
		playSelectForm[0][2].value,
		playSelectForm[0][3].value.toUpperCase()
	);
	if (player1.name == player2.name || player1.marker == player2.marker) {
		let nameMarkerCheck = document.createElement("span");
		nameMarkerCheck.id = "formWarning";
		nameMarkerCheck.innerText =
			"Name and marker must be different for each player!";
		playSelectForm[0].appendChild(nameMarkerCheck);
		return;
	}
	playerSection[0].children[0].innerText = player1.name;
	playerSection[1].children[0].innerText = player2.name;
	playerSection[0].children[1].innerText = player1.marker;
	playerSection[1].children[1].innerText = player2.marker;
	playSelectForm[0].style.visibility = "hidden";
	flipBoxMess.firstElementChild.innerText = `${player1.name}`;
	coinFlipBox.style.visibility = "visible";
}

//↑
//Global Functions
//

//
//Modules
//↓

const boardData = (() => {
	let board = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	const placeMarker = (playerChoice) => {
		let firstIndex = Math.floor(playerChoice / 3);
		let secondIndex =
			playerChoice <= 2 ? playerChoice : findGridIndex(playerChoice);
		board[firstIndex][secondIndex] = currentPlayer.marker;
	};

	const checkWinner = () => {
		// Check for a winner in the rows
		for (let i = 0; i < 3; i++) {
			if (
				board[i][0] === board[i][1] &&
				board[i][1] === board[i][2] &&
				board[i][0] != null
			) {
				return true;
			}
		}

		// Check for a winner in the columns
		for (let i = 0; i < 3; i++) {
			if (
				board[0][i] === board[1][i] &&
				board[1][i] === board[2][i] &&
				board[0][i] != null
			) {
				return true;
			}
		}

		// Check for a winner in the diagonals
		if (
			board[0][0] === board[1][1] &&
			board[1][1] === board[2][2] &&
			board[0][0] != null
		) {
			return true;
		}

		if (
			board[0][2] === board[1][1] &&
			board[1][1] === board[2][0] &&
			board[0][2] != null
		) {
			return true;
		}

		// No winner yet
		return null;
	};

	return { board, checkWinner, placeMarker };
})();

//↑
//Modules
//

//
//Factory Functions
//↓

const player = (name, marker) => {
	const playerChoice = (element) => {
		if (element.innerText.length == 0) {
			boardData.placeMarker(gameBoard.indexOf(element));
			element.innerHTML = `<span>${currentPlayer.marker}</span>`;
			if (boardData.checkWinner()) {
				winnerBox.innerHTML = `<h3>${currentPlayer.name} Wins!</h3>
				<br>
				<button id='resetBtn'>Reset</button>`;
				winnerBox.style.visibility = "visible";
				waitForClick("resetBtn").then(() => {
					location.reload();
				});
			} else {
				currentPlayer = currentPlayer == player1 ? player2 : player1;
				turnKeeper.children[1].innerText = currentPlayer.name;
			}
		}
	};

	return { name, marker, playerChoice };
};

//↑
//Factory Functions
//

//
//Event Listeners
//↓

submitBtn.addEventListener("click", (btn) => {
	btn.preventDefault();
	initCoinFlip();
});

gameBoard.forEach((element) => {
	element.addEventListener("click", () => {
		currentPlayer.playerChoice(element);
	});
});

//↑
//Event Listeners
//

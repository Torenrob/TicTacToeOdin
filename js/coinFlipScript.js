let coin = document.querySelector(".coin");
let headsBtn = document.querySelector("#heads-button");
let tailsBtn = document.querySelector("#tails-button");
const coinFlipBtns = document.getElementById("buttonDiv");
let flipBoxMessage = document.getElementById("flipBoxMessage");

headsBtn.addEventListener("click", (x) => {
	tailsBtn.id = "notChosen";
	tailsBtn.disabled = true;
	flipResult(x.target.innerText);
});
tailsBtn.addEventListener("click", (x) => {
	headsBtn.id = "notChosen";
	headsBtn.disabled = true;
	flipResult(x.target.innerText);
});

function flipResult(flipChoice) {
	let i = Math.floor(Math.random() * 2);
	coin.style.animation = "none";
	if (i) {
		coin.style.animation = "spin-heads 3s forwards";
		coin.addEventListener("animationend", () => {
			if (flipChoice == "Heads") {
				flipBoxMessage.innerHTML = `<h4 style="display: flex; justify-content: center;">${player1.name} Goes First!</h4>`;
				currentPlayer = player1;
				changeCoinBtns();
			} else {
				flipBoxMessage.innerHTML = `<h4 style="display: flex; justify-content: center;">${player2.name} Goes First!</h4>`;
				currentPlayer = player2;
				changeCoinBtns();
			}
		});
	} else {
		coin.style.animation = "spin-tails 3s forwards";
		coin.addEventListener("animationend", () => {
			if (flipChoice == "Tails") {
				flipBoxMessage.innerHTML = `<h4 style="display: flex; justify-content: center;">${player1.name} Goes First!</h4>`;
				currentPlayer = player1;
				changeCoinBtns();
			} else {
				flipBoxMessage.innerHTML = `<h4 style="display: flex; justify-content: center;">${player2.name} Goes First!</h4>`;
				currentPlayer = player2;
				changeCoinBtns();
			}
		});
	}
}

function changeCoinBtns() {
	coinFlipBtns.innerHTML =
		'<button id="playBtn" class="oneBtn" style="justify-self: center;"> Play Tic-Tac-Toe! </button>';

	waitForClick("playBtn").then(() => {
		startGame(currentPlayer);
	});
}

let coin = document.querySelector(".coin");
let headsBtn = document.querySelector("#heads-button");
let tailsBtn = document.querySelector("#tails-button");

headsBtn.addEventListener("click", (x) => console.log(x.srcElement.innerText));

(pointer) => {
	let i = Math.floor(Math.random() * 2);
	coin.style.animation = "none";
	if (i) {
		setTimeout(function () {
			coin.style.animation = "spin-heads 3s forwards";
		}, 100);
	} else {
		setTimeout(function () {
			coin.style.animation = "spin-tails 3s forwards";
		}, 100);
	}
	disableButton();
};

function disableButton() {
	headsBtn.disabled = true;
	tailsBtn.disabled = true;
	setTimeout(function () {
		headsBtn.disabled = false;
		tailsBtn.disabled = false;
	}, 3000);
}

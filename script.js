const slider = document.querySelector("[data-slider]");
const ball = document.querySelector("[data-ball]");
const theme1 = document.querySelector("[data-theme-1]");
const theme2 = document.querySelector("[data-theme-2]");
const theme3 = document.querySelector("[data-theme-3]");

theme1.onclick = () => {
	document.body.classList.remove(document.body.classList);
	document.body.classList.add("theme-1");
};

theme2.onclick = () => {
	document.body.classList.remove(document.body.classList);
	document.body.classList.add("theme-2");
};

theme3.onclick = () => {
	document.body.classList.remove(document.body.classList);
	document.body.classList.add("theme-3");
};

const buttons = document.querySelectorAll("[data-grid]>div.key");
const answerOutput = document.querySelector("[data-answer]>h1");

let answer = 0;
let input = "0";

for (const button of buttons) {
	if (button.classList.contains("reset")) {
		button.onclick = () => {
			answer = 0;
			input = "0";
			answerOutput.innerHTML = answer;
			updateFontSize();
		};
	} else if (button.classList.contains("equals")) {
		button.onclick = () => {
			let splitted = input.replace(" ","").split(/[\+\-x\/]/);
			if (!splitted.some((s) => [".", ""] == s)) {
				try {
					answer = eval(input.replace(/x/g, "*")).toString();
					input = answer;
					answerOutput.innerHTML = parseFloat(answer).toLocaleString("en-US");
					updateFontSize();
				} catch {}
			}
		};
	} else if (button.classList.contains("del")) {
		button.onclick = () => {
			input = input.slice(0, -1);
			if (input.length === 0) input = "0";
			answerOutput.innerHTML = input;
			updateFontSize();
		};
	} else {
		button.onclick = () => {
			if (answerOutput.innerHTML.length >= 40) return;
			if (["+", "-", "x", "/"].includes(button.innerText.trim())) {
				if (["+", "-", "x", "/"].some((o) => input.includes(o))) {
					input = input.replace(/[\+\-x\/]/g, button.innerText.trim());
				} else {
					input += button.innerText.trim();
				}
			} else if (button.innerText.trim() == ".") {
				if (
					input
						.split(/[\+\-x\/]/)
						.pop()
						.includes(".")
				)
					return;
				input += ".";
			} else {
				if (input === "0") {
					input = button.innerText.trim();
				} else {
					input += button.innerText.trim();
				}
			}

			answerOutput.innerHTML = input.trim();
			updateFontSize();
		};
	}
}

function updateFontSize() {
	// console.log(answerOutput.innerHTML.length);
	if (answerOutput.innerHTML.length >= 10) {
		answerOutput.style.fontSize = `${1 - answerOutput.innerHTML.length / 100}em`;
		if (answerOutput.innerHTML.length >= 20) {
			answerOutput.style.fontSize = `${0.8 - answerOutput.innerHTML.length / 100}em`;
		}
	} else {
		answerOutput.style.fontSize = "1.6em";
	}
}

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
		};
	} else if (button.classList.contains("equals")) {
		button.onclick = () => {
			let splitted = input.split(/[\+\-x\/]/);
			if (!splitted.some((s) => [".", ""] == s)) {
				try {
					answer = eval(input.replace(/x/g, "*")).toString();
					input = answer;
					answerOutput.innerHTML = parseFloat(answer).toLocaleString("en-US");
				} catch {}
			}
		};
	} else if (button.classList.contains("del")) {
		button.onclick = () => {
			input = input.slice(0, -1);
			if (input.length === 0) input = "0";
			answerOutput.innerHTML = input;
		};
	} else {
		button.onclick = () => {
			// console.log(
			// 	button.innerText,
			// 	["+", "-", "x", "/"].some((o) => input.includes(o))
			// );
			if (["+", "-", "x", "/"].includes(button.innerText)) {
				if (["+", "-", "x", "/"].some((o) => input.includes(o))) {
					input = input.replace(/[\+\-x\/]/g, button.innerText);
				} else {
					input += button.innerText;
				}
			} else if (button.innerText == ".") {
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
					input = button.innerText;
				} else {
					input += button.innerText;
				}
			}

			answerOutput.innerHTML = input;
		};
	}
}

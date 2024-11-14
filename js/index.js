function dragElement(el) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		el.style.top = el.offsetTop - pos2 + "px";
		el.style.left = el.offsetLeft - pos1 + "px";
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}

	el.querySelector(".window-header").onmousedown = dragMouseDown;
}

window.onload = function () {
	const windows = document.querySelectorAll(".window");
	windows.forEach((window) => {
		dragElement(window);
	});
};

function closeWindow(windowId) {
	document.getElementById(windowId).style.display = "none";
}

function openWindow(windowId) {
	document.getElementById(windowId).style.display = "block";
}

const radioPlayer = document.getElementById("radioPlayer");
const playButton = document.querySelector(".play-button");

function togglePlay() {
	if (radioPlayer.paused) {
		radioPlayer.play();
		playButton.textContent = "Pause";
	} else {
		radioPlayer.pause();
		playButton.textContent = "Play";
	}
}

element.addEventListener("touchstart", handleTouchStart);
element.addEventListener("touchmove", handleTouchMove);
element.addEventListener("touchend", handleTouchEnd);

const element = document.getElementById("draggable");

let isDown = false;
let offset = [0, 0];

element.addEventListener("pointerdown", (e) => {
	element.addEventListener("touchstart", (e) => {
		isDown = true;
		offset = [
			element.offsetLeft - e.clientX,
			element.offsetTop - e.clientY,
			element.offsetLeft - e.touches[0].clientX,
			element.offsetTop - e.touches[0].clientY,
		];
		e.preventDefault();
	});

	element.addEventListener("pointermove", (e) => {
		element.addEventListener("touchmove", (e) => {
			if (isDown) {
				const xPointer = e.clientX + offset[0];
				const yPointer = e.clientY + offset[1];
				const xTouch = e.touches[0].clientX + offset[2];
				const yTouch = e.touches[0].clientY + offset[3];
				element.style.transform = `translateX(${xPointer}px) translateY(${yPointer}px)`;
				element.style.transform = `translateX(${xTouch}px) translateY(${yTouch}px)`;
			}
			e.preventDefault();
		});

		element.addEventListener("pointerup", () => {
			element.addEventListener("touchend", () => {
				isDown = false;
				e.preventDefault();
			});
		});
	});
});

// this will be the game connection
//

const websocketRoot = "ws://localhost:4041";
const clientId = window.location.href.split("?")[1].split("=")[1];
console.log("clientId: ", clientId);
const gameId = window.location.href.split("/")[4].split("?")[0];
console.log("gameId: ", gameId);
var ws = new WebSocket(`${websocketRoot}/ws?clientId=${clientId}&gameId=${gameId}`);
console.log("ws: ", ws);


ws.onmessage = function(event) {
	var data = JSON.parse(event.data);
	console.log("Message received: ", event.data);
	if (data?.board) {
		const cells = document.querySelectorAll(".cell");
		setInfo(data);
		console.log("INFO ", info);


		for (let i = 0; i < cells.length; i++) {
			const innerCell = document.createElement("div");
			innerCell.style.textAlign = "center";
			innerCell.style.display = "inline-block";
			innerCell.textContent = data.board[i];

			if (cells[i].firstChild) {
				cells[i].firstChild.remove();
			}
			cells[i].appendChild(innerCell);
		}
	}
};

function setInfo(data) {
	const info = document.querySelector("#info");
	if (data.status === "running") {
		info.innerHTML = clientId === data.turn ? "Your turn" : "Opponent's turn";
	} else if (data.status === "done") {
		info.innerHTML = data.turn === clientId ? "You won" : "You lost";
	} else {
		info.innerHTML = "Waiting for opponent";
	}



}

function initBoard() {		// Init board
	var board = document.querySelector(".board");
	const row = document.createElement("div");
	row.classList.add("row");

	const cell = document.createElement("div");
	cell.classList.add("cell");

	const cellCount = 9;

	for (let i = 0; i < cellCount; ++i) {
		const newCell = cell.cloneNode();
		newCell.dataset.number = i;

		board.appendChild(newCell);
	}

	// Add click event for cell click
	const cells = document.querySelectorAll(".cell");
	for (const _cell of cells) {
		_cell.addEventListener('click', (event) => {
			const cell = event.target;
			const number = cell.dataset.number;
			ws.send(JSON.stringify({ zell: number, clientId: clientId, gameId }));
		});
	}


}

setTimeout(() => {
	initBoard();
}, 100)

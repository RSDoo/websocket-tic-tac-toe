var clientID = Math.floor(Math.random() * 1000000);
const websocketRoot = "ws://localhost:8080";

var ws = new WebSocket(`${websocketRoot}/ws?clientID=${clientID}`);
console.log("ws: ", ws);

let clientIdling = 0;

//var log_div = document.querySelector("#log"); //.getElementById("log");
//console.log("div: ", log_div);
//
//function log(message, status = "normal") {
//	log_div.innerHTML += `<p class="${status}">${message}</p>`;
//	log_div.scrollTop += 1000;
//}
//
function updateClientCount() {
	setTimeout(() => {
		document.querySelector("#clientIdle").innerHTML = clientIdling;
	})
}
//
ws.onopen = function() {
	console.log("Connection established");
	//	log("Connection established");
};

ws.onmessage = function(event) {
	var data = JSON.parse(event.data);
	console.log("Message received: ", event.data);
	updateClientCount();
	clientIdling = data.clientCount;
};




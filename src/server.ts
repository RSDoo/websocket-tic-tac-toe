import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express();
app.use(express.static("static"));

const PORT = 4000 || process.env.PORT;
const STATIC_PATH = "/static";

let clientCount = 0;

console.log("hello world from the service :) ");

const wsServer = new WebSocketServer({
	port: 8080
});

wsServer.on("connection", (ws: WebSocket) => {
	clientCount++;
	console.log("client connected count: ", clientCount);
	wsServer.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({ clientCount }));
		}
	});

	ws.on("close", () => {
		clientCount--;
		wsServer.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify({ clientCount }));
			}
		});
	});

	ws.on("error", console.error);

	ws.on("message", (message: string) => {
		console.log("message received: %s", message);


	});


});

app.listen(PORT, () => {
	console.log("server started on port oooooon ", PORT);
	console.log(`http://localhost:${PORT}`);
});


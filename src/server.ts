import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import { startGameServer } from "./game";

interface IWebSocket extends WebSocket {
	id: string;
}
const app = express();
app.use(express.static("static"));

const PORT_EXPRESS = 4040 || process.env.PORT;
const STATIC_PATH = "/static";

let clientCount = 0;


const PORT_WEBSOCKET = 8080;
const wsServer = new WebSocketServer({
	port: PORT_WEBSOCKET
});

wsServer.on("connection", (ws: IWebSocket, req: any) => {
	const clientID = req.url.split("?")[1].split("=")[1];
	ws.id = clientID;

	clientCount++;
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

app.listen(PORT_EXPRESS, () => {
	console.log(`http://localhost:${PORT_EXPRESS}`);
	startGameServer();
});

app.get("/game/:id", (req, res) => {
	res.sendFile(STATIC_PATH + "/game.html", { root: "./" });

})

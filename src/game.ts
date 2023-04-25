import WebSocket, { WebSocketServer } from "ws";
import { Game } from "./interfaces/game_class";
import { IWebSocket } from "./interfaces/interface";


export function startGameServer() {
	const findGame = (id: string) => {
		return openGames.find(game => game.id == id)
	}

	const PORT_WEBSOCKET = 4041;
	const wsGameServer = new WebSocketServer({
		port: PORT_WEBSOCKET
	});
	const openGames: Game[] = [];

	setInterval(() => {
		console.log("openGames", openGames);
	}, 5000);


	wsGameServer.on("connection", (ws: IWebSocket, req: any) => {
		const clientID = req.url.split("?")[1].split("=")[1].split("&")[0];
		const gameID = req.url.split("?")[1].split("=")[2];
		console.log("gameID:", gameID);

		console.log("req", clientID);
		const game = findGame(gameID);

		if (!game) {
			const newGameIdx = openGames.length;
			openGames.push(new Game(gameID));
			openGames[newGameIdx].addPlayer({ id: clientID, symbole: 'x' });
			broadCastClients(wsGameServer.clients, openGames[newGameIdx].asMessage());

		} else if (game.players.length < 2) {
			game.addPlayer({ id: clientID, symbole: 'o' });
			broadCastClients(wsGameServer.clients, game.asMessage());
		} else {
			console.log("game is full");
		}

		ws.on("close", () => {
			broadCastClients(wsGameServer.clients, "client disconnected");
		});

		ws.on("error", console.error);

		ws.on("message", (message: string) => {
			console.log("gameserver-message received: %s", message);
			const data = JSON.parse(message);
			const game = findGame(data.gameId);
			const client = game?.players.find(client => client.id == data.clientId);

			if (game && client) {
				game.set(data.zell, client);
				broadCastClients(wsGameServer.clients, game.asMessage());
			}
		});
	});
}

function broadCastClients(clients: Set<WebSocket.WebSocket>, message: string) {
	console.log(message);
	clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
}


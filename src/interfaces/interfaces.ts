import { WebSocket } from "ws";

export interface IWebSocket extends WebSocket {
	id: string;
}


export interface Player {
	id: string;
	symbole: 'x' | 'o';
}


import { Player } from "./interface";

export class Game {
	board = new Array(9);
	id: string = '';
	players: Player[] = [];
	status: 'done' | 'running' | 'waiting' = 'waiting';
	turn: string = '';

	constructor(id: string) {
		this.id = id;
	}

	set(position: number, client: Player) {
		if (!this.board[position] && this.status == 'running' && this.turn === client.id) {
			this.board[position] = client.symbole;
			this.checkWin(client.symbole);

			if (this.status === 'running') {
				this.turn = this.players.find(player => player.id != client.id)?.id || '';
			}
		}
	}

	addPlayer(player: Player) {
		this.players.push(player);
		if (this.players.length == 2) {
			this.status = 'running';
			this.turn = this.players[0].id;
		}
	}

	asMessage() {
		return JSON.stringify({ board: this.board, status: this.status, turn: this.turn });
	}

	checkWin(symbol: 'x' | 'o') {
		if (this.board[0] == symbol &&
			this.board[1] == symbol &&
			this.board[2] == symbol) {
			this.status = 'done';
		} else if (this.board[3] == symbol &&
			this.board[4] == symbol &&
			this.board[5] == symbol) {
			this.status = 'done';
		} else if (this.board[6] == symbol &&
			this.board[7] == symbol &&
			this.board[8] == symbol) {
			this.status = 'done';
		} else if (this.board[0] == symbol &&
			this.board[3] == symbol &&
			this.board[6] == symbol) {
			this.status = 'done';
		} else if (this.board[1] == symbol &&
			this.board[4] == symbol &&
			this.board[7] == symbol) {
			this.status = 'done';
		} else if (this.board[2] == symbol &&
			this.board[5] == symbol &&
			this.board[8] == symbol) {
			this.status = 'done';
		} else if (this.board[0] == symbol &&
			this.board[4] == symbol &&
			this.board[8] == symbol) {
			this.status = 'done';
		} else if (this.board[6] == symbol &&
			this.board[4] == symbol &&
			this.board[2] == symbol) {
			this.status = 'done';
		}
	}
}


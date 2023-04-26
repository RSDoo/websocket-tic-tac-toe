# Websocket - Tic Tac Toe
Simple tryout of websockets playing the game "tic tac toe" over websockets

## Usage
Clone the repo
```bash
git clone https://github.com/RSDoo/websocket-tic-tac-toe.git
```
Navigate into the project
```bash
cd websocket-tic-tac-toe
```

Install node packages
```bash
npm i
```

Start the test server local
```bash
npm run dev
```

Open the game in the browser with
`http://localhost:4040/game/<your-game-id>?clientId=<your-client-id>`

## ToDo's
- [ ] Implement the lobby. Find oponent / create match
- [ ] Move the clientId from query params to header
- [ ] Cool animations for winning / loosing / draw
- [ ] Rematch with same oponent

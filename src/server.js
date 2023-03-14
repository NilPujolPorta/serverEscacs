const { count } = require('console');

const app = require('express')();
const httpServer = require('http').Server(app);
const port = 4444;

// Habilitació per CORS
// https://socket.io/docs/v3/handling-cors/
const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
    }
});

const players = { jugadors: [] };

httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

io.on("connection", socket => {
    console.log(`Socket ${socket.id} has connected`);
    socket.on("addPlayer", player => {
        switch (players.jugadors.length) {
            case 0:
                players.jugadors.push({ nom: player.nom, color: "w", taulell: "tw", id: player.id });
                io.emit("players", players);
                socket.emit("player", { nom: player.nom, color: "w", taulell: "tw", id: player.id });
                break;
            case 1:
                players.jugadors.push({ nom: player.nom, color: "b", taulell: "tw", id: player.id });
                io.emit("players", players);
                socket.emit("player", { nom: player.nom, color: "b", taulell: "tw", id: player.id });
                break;
            case 2:
                players.jugadors.push({ nom: player.nom, color: "w", taulell: "tb", id: player.id });
                io.emit("players", players);
                socket.emit("player", { nom: player.nom, color: "w", taulell: "tb", id: player.id });
                break;
            case 3:
                players.jugadors.push({ nom: player.nom, color: "b", taulell: "tb", id: player.id });
                io.emit("players", players);
                socket.emit("player", { nom: player.nom, color: "b", taulell: "tb", id: player.id });
                io.emit("startGame", true)
                break;
            default:
                socket.emit("players", players);
                socket.emit("player", { nom: player.nom, color: "s", taulell: "tw", id: player.id });
                socket.emit("startGame", true)
                break;
        }
    });

    socket.on("move", movement => {
        io.emit("move", movement);
    });

});
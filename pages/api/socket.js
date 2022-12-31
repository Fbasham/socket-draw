import { Server } from "socket.io";

let rooms = {};

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("connect-to-room", ({ room, clientId, name }) => {
      socket.join(room);
      if (!(room in rooms)) {
        rooms[room] = {
          players: [{ clientId, socketId: socket.id, name, isAdmin: true }],
        };
      } else {
        let i = rooms[room].players.findIndex((p) => p.clientId === clientId);
        if (i !== -1) {
          let p = rooms[room].players[i];
          rooms[room].players.splice(i, 1);
          rooms[room].players.push({ ...p, socketId: socket.id });
        } else
          rooms[room].players.push({ clientId, socketId: socket.id, name });
      }

      io.to(room).emit("update-data", rooms[room]);
    });
  });

  res.end();
}

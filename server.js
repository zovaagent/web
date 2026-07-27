const { Server } = require("socket.io");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    path: "/api/socketio",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const connectedUsers = new Map();

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join", (userId) => {
      connectedUsers.set(socket.id, userId);
      socket.join(`user:${userId}`);
      console.log(`User ${userId} joined`);
    });

    socket.on("agent:status", (data) => {
      const userId = connectedUsers.get(socket.id);
      if (userId) {
        io.to(`user:${userId}`).emit("agent:update", {
          ...data,
          timestamp: Date.now(),
        });
      }
    });

    socket.on("agent:log", (data) => {
      const userId = connectedUsers.get(socket.id);
      if (userId) {
        io.to(`user:${userId}`).emit("agent:log", {
          ...data,
          timestamp: Date.now(),
        });
      }
    });

    socket.on("activity", (data) => {
      const userId = connectedUsers.get(socket.id);
      if (userId) {
        io.to(`user:${userId}`).emit("activity:new", {
          ...data,
          timestamp: Date.now(),
        });
      }
    });

    socket.on("disconnect", () => {
      connectedUsers.delete(socket.id);
      console.log("Client disconnected:", socket.id);
    });
  });

  (global).io = io;

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Socket.io ready on path /api/socketio`);
  });
});

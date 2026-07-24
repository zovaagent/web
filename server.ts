import { Server } from "socket.io";
import { createServer } from "http";
import { parse } from "url";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    path: "/api/socketio",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Store connected users
  const connectedUsers = new Map<string, string>(); // socketId -> userId

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // User joins with their userId
    socket.on("join", (userId: string) => {
      connectedUsers.set(socket.id, userId);
      socket.join(`user:${userId}`);
      console.log(`User ${userId} joined`);
    });

    // Agent status update
    socket.on("agent:status", (data: { agentId: string; status: string; progress?: number }) => {
      const userId = connectedUsers.get(socket.id);
      if (userId) {
        io.to(`user:${userId}`).emit("agent:update", {
          ...data,
          timestamp: Date.now(),
        });
      }
    });

    // Agent log
    socket.on("agent:log", (data: { agentId: string; level: string; message: string }) => {
      const userId = connectedUsers.get(socket.id);
      if (userId) {
        io.to(`user:${userId}`).emit("agent:log", {
          ...data,
          timestamp: Date.now(),
        });
      }
    });

    // Activity event
    socket.on("activity", (data: { agentId: string; kind: string; message: string }) => {
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

  // Make io accessible to API routes
  (global as any).io = io;

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Socket.io ready on path /api/socketio`);
  });
});

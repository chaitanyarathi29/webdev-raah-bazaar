import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.on('chat-message', (msg) => {
    console.log('📩 Received:', msg);
    io.emit('chat-message', msg); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('✅ Socket.IO server running on http://localhost:5000');
});

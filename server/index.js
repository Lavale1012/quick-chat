const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Environment variables with defaults
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors());

const server = http.createServer(app);

server.listen(PORT, () => {
  if (NODE_ENV === 'development') {
    console.log(`Server listening on port ${PORT}`);
  }
});

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://quick-chat-7a9b.onrender.com",
      "https://quick-chat-gamma.vercel.app",
    ],
    methods: ["GET", "POST"],
    maxHttpBufferSize: 1e7,
  },
});

io.on("connection", (socket) => {
  if (NODE_ENV === 'development') {
    console.log(`User ${socket.id} connected`);
  }

  socket.on("join_room", (data) => {
    // Validate room data
    if (!data || typeof data !== 'string' || data.trim().length === 0) {
      socket.emit('error', 'Invalid room ID');
      return;
    }
    
    socket.join(data);
    if (NODE_ENV === 'development') {
      console.log(`User ${socket.id} joined room: ${data}`);
    }
  });

  socket.on("send_message", (data) => {
    // Validate message data
    if (!data || !data.room || (!data.message && !data.image)) {
      socket.emit('error', 'Invalid message data');
      return;
    }

    if (NODE_ENV === 'development') {
      console.log(`Message sent to room ${data.room} by ${data.author}`);
    }
    
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    if (NODE_ENV === 'development') {
      console.log(`User ${socket.id} disconnected`);
    }
  });
});

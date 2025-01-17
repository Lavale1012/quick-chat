const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

server.listen(3001, () => {
  console.log("listening on port 3001");
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
  console.log(`user: ${socket.id} is connected`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

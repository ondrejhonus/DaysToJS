const express = require('express');
const bodyParser = require("body-parser");
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.render("menu");
});

app.get('/countdown', (req, res) => {
    res.render("countdown");
  });

io.on('connection', (socket) => {
  socket.on("join room", (room) => {
    console.log("user joined room", room);
    socket.join(room);
  });

  socket.on('chat message out', (data) => {
    socket.to(data.room).emit(`chat message in ${data.room}`, data.msg);
  });

  socket.on("leave room", (room) => {
    console.log("user left room", room);
    socket.leave(room);
  });
});

server.listen(PORT, () => {
  console.log('server running at http://localhost:' + PORT);
});
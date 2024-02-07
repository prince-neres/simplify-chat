require("dotenv").config();

const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");
const { getFormattedTime } = require("./util");

const app = express();
app.use(cors());

const server = createServer(app);

const clientPort = process.env.CLIENT_PORT ? process.env.CLIENT_PORT : 3000;

const socket = new Server(server, {
  cors: {
    origin: `http://localhost:${clientPort}`,
    methods: ["GET", "POST"],
  },
});

const users = new Set();

socket.on("connection", (ws) => {
  const userRef = { ws };
  users.add(userRef);
  ws.on("message", (message) => {
    console.log(message);
    try {
      const data = JSON.parse(message);
      if (typeof data.sender !== "string" || typeof data.body !== "string") {
        console.error("Mensage Inválida");
        return;
      }

      const messageToSend = {
        sender: data.sender,
        body: data.body,
        sendAt: getFormattedTime(),
      };

      users.forEach((user) => {
        user.ws.send(JSON.stringify(messageToSend));
      });
    } catch (e) {
      console.error("Erro ao enviar mensagem ao cliente", e);
    }
  });
  ws.on("close", (code, reason) => {
    users.delete(userRef);
    console.log(`Conexão fechada: ${code} ${reason}!`);
  });
});

const serverPort = process.env.SERVER_PORT ? process.env.SERVER_PORT : 4000;

server.listen(serverPort, () => {
  console.log(`Servidor rodando em http://localhost:${serverPort}`);
});

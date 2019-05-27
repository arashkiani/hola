import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { config as dotEnvConfig } from "dotenv";

// Config
dotEnvConfig();
const PORT = process.env.PORT || 8999;

//initialize http server
const app = express();
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  // connection
  ws.on("message", (message: string) => {
    // received
    console.log(`received: ${message}`);
    ws.send(`received: ${message}`);
  });

  // Connected
  ws.send("Connected");
});

// start
server.listen(PORT, () => {
  console.log(`ws://localhost:${PORT}`);
});

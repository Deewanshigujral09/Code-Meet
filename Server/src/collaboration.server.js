import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: 1234,
});

wss.on("connection", (socket) => {
  console.log("Collaboration client connected");

  socket.send(
    JSON.stringify({
      type: "connected",
      message: "Collaboration server connected",
    })
  );

  socket.on("message", (message) => {
    console.log("Received:", message.toString());

    // For now, send the message back to the sender.
    socket.send(message.toString());
  });

  socket.on("close", () => {
    console.log("Collaboration client disconnected");
  });
});

console.log("Collaboration WebSocket running on ws://localhost:1234");
export const connectWebSocket = () => {
  const socket = new WebSocket("ws://localhost:1234");

socket.onopen = () => {
  console.log("WebSocket connected");

  socket.send(
    JSON.stringify({
      type: "test",
      message: "Hello from Code Meet",
    })
  );
};

  socket.onmessage = (event) => {
    console.log("WebSocket message:", event.data);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return socket;
};
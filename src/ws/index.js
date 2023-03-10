import io from "socket.io-client";

const socket = io("ws://localhost:8000");

socket.on("stream", (data) => {
  console.log(data)
})

export default socket;
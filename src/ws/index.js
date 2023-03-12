import io from "socket.io-client";

const websocket = io("ws://localhost:8000");
export default websocket;
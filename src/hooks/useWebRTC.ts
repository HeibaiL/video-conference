import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


const useWebRTC = () => {
  const [websocket, setWebSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const ws = io("ws://localhost:8000");
    setWebSocket(ws);
  }, []);
    
  const getPeer = async () => {
    const PeerJs = (await import("peerjs")).default;

    return new PeerJs();
  };

  return { getPeer, websocket };

};
export default useWebRTC;
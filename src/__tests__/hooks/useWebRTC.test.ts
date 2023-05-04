import { renderHook } from "@testing-library/react";
import { Peer } from "peerjs";
import { Socket } from "socket.io-client";
import "@testing-library/jest-dom/extend-expect";

import useWebRTC from "@/hooks/useWebRTC";


describe("UseWebRTC", () => {
  
  it("has function which returns Peer instance", async () => {
    const { result } = renderHook(() => useWebRTC());
    const { getPeer } = result.current;

    expect(await getPeer()).toBeInstanceOf(Peer);
  });

  it("returns websocket", async () => {
    const { result } = renderHook(() => useWebRTC());
    const { websocket } = result.current;

    expect(websocket).toBeInstanceOf(Socket);
  });
});
  
import { useRef, useState, useEffect, FC } from "react";

const VideoStream:FC = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function setupWebcamVideo() {
      if (!mediaStream) {
        await setupMediaStream();
      } else {

        const videoCurr = videoRef.current;
        if (!videoCurr) return;
        const video = videoCurr;
        if (!video.srcObject) {
          video.srcObject = mediaStream;
        }
      }
    }
    setupWebcamVideo();
  }, [mediaStream]);


  async function setupMediaStream() {
    try {
      const ms = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true
      });
      setMediaStream(ms);
    } catch (e) {
      alert("Camera is disabled");
      throw e;
    }
  }

  return (
    <div className="w-full h-full relative z-0">
      <video className="h-full w-full mx-auto" ref={videoRef} autoPlay muted />
    </div>
  );
}

export default VideoStream;
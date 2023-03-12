import { useRef, useEffect, FC } from "react";

type VideoProps = {
  src: MediaStream | null
}

const Video:FC<VideoProps> = ({ src }) => {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = src
    }
  }, [src]);


  return (
    <div className="w-full h-full relative z-0">
      <video style={{ width: 500 }} className="h-full w-50% mx-auto" ref={videoRef} autoPlay muted />
    </div>
  );
}

export default Video;
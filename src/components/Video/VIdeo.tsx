import { useRef, useEffect, FC } from "react";
import classes from "classnames";

import styles from "@/styles/components/video.module.scss";

type VideoProps = {
  src: MediaStream | null,
  type: "large" | "small",
  userName?: string,
}

const Video:FC<VideoProps> = ({ src, type, userName, ...props }) => {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = src;
    }
  }, [src]);


  return (
    <div className={classes({ [styles.small]: type === "small" }, styles.video)} {...props} data-testid="video">
      <video style={{ width: 500 }} className="h-full w-50% mx-auto" ref={videoRef} autoPlay muted />
      <p>{userName}</p>
    </div>
  );
};

export default Video;
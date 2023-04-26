import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

//components
import Video from "@/components/Camera";

//helpers
import websocket from "@/ws"

//styles
import styles from "@/styles/pages/conference.module.scss"


const Conference:FC = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream[]>([]);
  const [selfStream, setSelfStream] = useState<MediaStream | null>(null);
  const router = useRouter();
  const roomId = router.query.id;


  useEffect(() => {
    const peers: any = {};

    const startStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true
      });
      setSelfStream(stream)
      const PeerJs = (await import("peerjs")).default;
      const peer = new PeerJs();

      const connection = peer.on("open", (id) => {
        websocket.emit("joinRoom", roomId, id)
      })

      connection.on("call", call => {
        call.answer(stream)
        peers[call.peer] = call;
        call.on("stream", userVideoStream => {
          setMediaStream((prev) => {
            return prev.includes(userVideoStream) ? prev : [...prev, userVideoStream]
          })
        })
      })

      websocket.on("userConnected", (userId) => {
        const call = peer.call(userId, stream);
        peers[userId] = call;
     
        call.on("stream", userVideoStream => {
          setMediaStream((prev) => {
            return prev.includes(userVideoStream) ? prev : [...prev, userVideoStream]
          })
        })
      })

      websocket.on("userDisconnected", (userId) => {
        peers[userId].close();
        setMediaStream(prev => {
          // prev.pop()
          return [...prev]
        })
      })
    }

    startStream()
    
    return () => {
      websocket.disconnect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.headerBack}>
            <i className="fas fa-angle-left"></i>
          </div>
          <h3>Video Chat</h3>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.mainLeft}>
          <div className={styles.videosGroup}>
            <div id={styles.videoGrid}>
              <Video src={selfStream}/>
              {mediaStream.map((stream, i) => <Video key={stream.id + i} src={stream}/>)}
            </div>
          </div>
          <div className={styles.options}>
            <div className={styles.optionsLeft}>
              <div id={styles.stopVideo} className={styles.optionsButton}>
                <i className="fa fa-video-camera"></i>
              </div>
              <div id={styles.muteButton} className={styles.optionsButton}>
                <i className="fa fa-microphone"></i>
              </div>
              <div id={styles.showChat} className={styles.optionsButton}>
                <i className="fa fa-comment"></i>
              </div>
            </div>
            <div className={styles.optionsRight}>
              <div id={styles.inviteButton} className={styles.optionsButton}>
                <i className="fas fa-user-plus"></i>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainRight}>
          <div className={styles.mainChatWindow}>
            <div className={styles.messages}>

            </div>
          </div>
          <div className={styles.mainMessageContainer}>
            <input id={styles.chatMessage} type="text" autoComplete="off" placeholder="Type message here..."/>
            <div id={styles.send} className={styles.optionsButton}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Conference;
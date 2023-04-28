import { FC, useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import Peer, { MediaConnection } from "peerjs";

//components
import Video from "@/components/Camera";

//helpers
import useWebRTC from "@/hooks/useWebRTC";

//styles
import styles from "@/styles/pages/conference.module.scss"


type StreamWIthMeta = {
  stream: MediaStream,
  userId: string
}


const Conference:FC = () => {
  const [mediaStream, setMediaStream] = useState<StreamWIthMeta[]>([]);
  const [selfStream, setSelfStream] = useState<MediaStream | null>(null);
  const [connected, setConnected] = useState(false); //TODO: ADD LOGIC FOR connected flag

  const router: NextRouter = useRouter();

  const { getPeer, websocket } = useWebRTC();

  const roomId = router.query.id;

  const updateMediaStream = (userId: string, stream: MediaStream) => {
    setMediaStream((prev) => {
      return prev.some(userStream => userStream.userId === userId)
        ? prev
        : [...prev, { userId, stream }]
    })
  }

  useEffect(() => {

    const startStream = async () => {
      const peers: { [key:string]: MediaConnection } = {};
      
      const peer: Peer = await getPeer()

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true
      });
      
      setSelfStream(stream);

      const connection = peer.on("open", (id) => {
    
        websocket?.emit("joinRoom", roomId, id)
        setConnected(true)
      })

      peer.on("error", error => {
        console.log(error);
      })

      connection.on("call", call => {
        call.answer(stream)
        peers[call.peer] = call;
        call.on("stream", userVideoStream => {
          updateMediaStream(call.peer, userVideoStream)
        })
      })

      websocket?.on("userConnected", (userId:string) => {
        const call = peer.call(userId, stream);
        peers[userId] = call;
     
        call.on("stream", userVideoStream => {
          updateMediaStream(call.peer, userVideoStream)
        })
      })

      websocket?.on("userDisconnected", (userId:string) => {
        peers[userId].close();
        setMediaStream(prev => prev.filter(userStream => userStream.userId !== userId))
      })
    }

    if (websocket && roomId) {
      websocket.connect()
      websocket.on("connect", startStream)
   
    }
    
    return () => {
      websocket?.disconnect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [websocket, roomId])

  console.log(connected)
  
  return (
    <div data-testid="conference">
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
              {mediaStream.map((streamData, i) => <Video key={streamData.stream.id + i} src={streamData.stream}/>)}
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
    </div>
  )
};

export default Conference;
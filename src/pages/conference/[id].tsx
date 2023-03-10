import { FC, useEffect } from "react";
import websocket from "@/ws"
import { useRouter } from "next/router";
//components
import Camera from "@/components/Camera";

//styles
import styles from "@/styles/pages/conference.module.scss"


const Conference :FC = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.id) {
      websocket.emit("joinRoom", router.query.id)

      websocket.on("userConnected", (roomId) => {
        console.log("ROOM", roomId)
      })
    }
  }, [router])

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
              <Camera/>
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
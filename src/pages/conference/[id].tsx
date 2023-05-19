import { FC, useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import Peer, { MediaConnection } from "peerjs";
import { HiPhoneMissedCall } from "react-icons/hi";
import classNames from "classnames";

//components
import Video from "@/components/Video";
import UserNameModal from "@/pages/conference/components/UserNameModal";

//helpers
import useWebRTC from "@/hooks/useWebRTC";
import { disableSSR } from "@/pages/utils";

//styles
import styles from "@/styles/pages/conference.module.scss";


type UserData = {
  userId: string,
  name: string
};

type StreamWIthMeta = UserData & { stream: MediaStream };


const Conference:FC = () => {
  const [mediaStream, setMediaStream] = useState<StreamWIthMeta[]>([]);
  const [selfStream, setSelfStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] = useState<Peer | null>(null);
  const [userNameModalData, setUserNameModalData] = useState <
      { name: string | null, open: boolean }>({ name: null, open: true });
  const [connected, setConnected] = useState(false); //TODO: ADD LOGIC FOR connected flag

  const router: NextRouter = useRouter();

  const { getPeer, websocket } = useWebRTC();

  const roomId = router.query.id;

  const updateMediaStream = ({ userId, name }: UserData, stream: MediaStream) => {
    setMediaStream((prev) => {
      return prev.some(userStream => userStream.userId === userId)
        ? prev
        : [...prev, { userId, name, stream }];
    });
  };

  const startStream = async () => {
    const peersMap:Map<string, {call?: MediaConnection, name?: string}> = new Map();

    const peer: Peer = await getPeer();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: true
    });

    setSelfStream(stream);

    const connection = peer.on("open", (id) => {
      websocket?.emit("joinRoom", null, { userId: id, name: userNameModalData.name });
      setConnected(true);
    });

    if (connection) {
      setPeerConnection(connection);
    }

    peer.on("error", error => {
      console.log(error);
    });

    websocket?.on("connectedUsers", users => {
      const parsedUsers:UserData[] = users.map((jsonUser:string) => JSON.parse(jsonUser));
      parsedUsers.forEach((user:UserData):void => {
        peersMap.set(user.userId, { ...peersMap.get(user.userId), name: user.name });
      });
    });


    connection.on("call", call => {
      if (call) {
        call.answer(stream);
        peersMap.set(call.peer, { ...peersMap.get(call.peer), call });
        call.on("stream", userVideoStream => {
          updateMediaStream({ userId: call.peer, name: peersMap.get(call.peer)?.name || "hello" }, userVideoStream);
        });
      }
    });

    websocket?.on("userConnected", ({ userId, name }) => {
      const call = peer.call(userId, stream);
      peersMap.set(userId, { ...peersMap.get(userId), call });
      call.on("stream", userVideoStream => {
        updateMediaStream({ userId, name }, userVideoStream);
      });
    });


    websocket?.on("userDisconnected", (userId:string) => {
      peersMap.get(userId)?.call?.close();
      setMediaStream(prev => prev.filter(userStream => userStream.userId !== userId));
    });
  };

  useEffect(() => {
    if (websocket && roomId && userNameModalData.name) {
      websocket.connect();
      websocket.on("connect", startStream);
    }
    
    return () => {
      websocket?.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, websocket, userNameModalData.name]);

  const leaveCall = async () => {
    websocket?.emit("leaveRoom", roomId, peerConnection?.id);
    peerConnection?.disconnect();
    setMediaStream([]);
  };

  const onModalSuccess = (data: string):void => {
    setUserNameModalData({ ...userNameModalData, name: data, open: false });
  };


  if (!userNameModalData.name) {
    return (
      <UserNameModal
        onSuccess={onModalSuccess}
        open={userNameModalData.open}
      />
    );
  }
  console.log(connected);
  
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
              <Video src={selfStream} type={mediaStream.length > 0 ? "small" : "large"}/>
              {mediaStream.map((streamData, i) => (
                <Video key={streamData.stream.id + i} src={streamData.stream} userName={streamData.name} type="large"/>
              ))}
            </div>
          </div>
          {mediaStream.length > 0 && <div className={styles.options}>
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
              <div
                onClick={leaveCall}
                id={styles.inviteButton}
                className={classNames(styles.optionsButton, styles.cancelButton)}
              >
                <HiPhoneMissedCall/>
              </div>
            </div>
          </div>}
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
  );
};

export default disableSSR(Conference);
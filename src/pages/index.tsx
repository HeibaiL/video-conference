import { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

//components
import Button from "@/components/Button";
import Layout from "@/layouts/Layout";


//assets
import LaptopImg from "@/assets/img/Laptop.png";
import CallImg from "@/assets/img/CallImg.png";
import NoiseImg from "@/assets/icons/NoiseImg";
import VoiceImg from "@/assets/icons/VoiceImg";
import CameraImg from "@/assets/icons/CameraImg";
import SmileImg from "@/assets/icons/SmileImg";

//styles
import styles from "@/styles/pages/home.module.scss";


export default function Home() {
  const router = useRouter();

  const clickHandler = async (): Promise<any> => {
    try {
      const res = await fetch("http://localhost:8000/api/room");
      const { roomId } = await res.json();
      if (roomId) {
        router.push(`/conference/${roomId}`)
      }
    } catch (ex) {
      return null
    }
  }


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className={styles.main}>

        <section className={styles.preview}>
          <div className={styles.previewContainer}>
            <div className={styles.previewContent}>
              <div className={styles.previewText}>
                <h1>Bring people together to make tickcles happen</h1>
                <p>
                    Revolutionary video calling app for design and code reviews.
                    With Tikcle, you ‘ll never to leave you house again.
                </p>
                <Button onClick={clickHandler} type={"primary"}>Get call</Button>
              </div>
              <div className={styles.previewImg}>
                <Image src={LaptopImg} alt={"LaptopImg"}/>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.call}>
          <div className={styles.callContent}>
            <div className={styles.callImg}><Image src={CallImg} alt={"CallImg"}/></div>
            <h2>Making video call amazing</h2>
            <p>
                Tikcle is a simple yet powerful video app that connects you to you co-workers through lightweight
                videoconferencing. It’s perfect for design sessions, brainstorm sessions, code reviews,
                business meetings,
                costumer support, product demos and much more...
            </p>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featuresContainer}>
            <h2>Features</h2>
            <div className={styles.featuresList}>
              <div className={styles.featuresElement}>
                <NoiseImg/>
                <div className={styles.elementContent}>
                  <h3>Noise Cancellation</h3>
                  <p>Smart filtering to remove noise and boosting your voice</p>
                </div>
              </div>
              <div className={styles.featuresElement}>
                <CameraImg/>
                <div className={styles.elementContent}>
                  <h3>CameraImg Auto Follow</h3>
                  <p>Smart filtering to remove noise and boosting your voice</p>
                </div>
              </div>
              <div className={styles.featuresElement}>
                <VoiceImg/>
                <div className={styles.elementContent}>
                  <h3>Voice Rooms</h3>
                  <p>Smart filtering to remove noise and boosting your voice</p>
                </div>
              </div>
              <div className={styles.featuresElement}>
                <SmileImg/>
                <div className={styles.elementContent}>
                  <h3>Beautify</h3>
                  <p>Smart filtering to remove noise and boosting your voice</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.footer}>
          <div className={styles.footerContent}>
            <h2>Design & code reviews on the go </h2>
            <p>The video calling experience thats helps you ship products faster</p>
            <Button type={"primary"}>Get call</Button>
          </div>
        </section>
      </main>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
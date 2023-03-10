import { ReactElement, ReactNode, useEffect } from "react";
//TODO
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import io from "socket.io-client";

//styles
import "normalize.css/normalize.css"
import "@/styles/index.css"


const socket = io("ws://localhost:8000");
const userId = uuidv4();

//TODO:fix EsLint disabled ERR
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    socket.emit("connection", (userId))

    return () => {
      socket.emit("disconnect")
    }
  }, [])
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

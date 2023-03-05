import type { AppProps } from "next/app"

//styles
import "@/styles/index.css"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

//styles
import "normalize.css/normalize.css";
import "@/styles/index.scss";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: ReactElement) => ReactNode,
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default App;
import "../styles/globals.css";
import type { AppProps } from "next/app";
import CoreLayout from "@/layouts/core/CoreLayout";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Compositr - Coder and crypto supporter" />
        <title>Compositr</title>
      </Head>
      <CoreLayout>
        <Component {...pageProps} />
      </CoreLayout>
    </>
  );
}

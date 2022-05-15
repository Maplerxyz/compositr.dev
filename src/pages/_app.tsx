import "../styles/globals.css";
import type { AppProps } from "next/app";
import CoreLayout from "@/common/layouts/core/CoreLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CoreLayout>
      <Component {...pageProps} />
    </CoreLayout>
  );
}

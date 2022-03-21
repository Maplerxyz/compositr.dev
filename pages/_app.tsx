import "../styles/globals.css";
import type { AppProps } from "next/app";
import "windi.css";
import { QueryClient, QueryClientProvider } from "react-query";
import NavBar from "../components/misc/nav/navbar";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <NavBar />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

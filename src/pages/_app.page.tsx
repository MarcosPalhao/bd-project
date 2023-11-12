import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { Alert } from "einer-alerts";
import "einer-alerts/output.css";

const inter = Inter({ subsets: ["latin"] });

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <main className={inter.className}>
        <Component {...pageProps} />
        <Alert />
      </main>
    </SessionProvider>
  );
}

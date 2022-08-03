import Layout from "components/Layout";
import type { AppProps } from "next/app";
import "styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;

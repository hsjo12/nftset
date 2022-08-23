import { ThemeProvider } from "styled-components";
import Layout from "../layout/layout";
import { theme, GlobalStyle } from "../styles/globalAndTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NFtsContext } from "../contextAPI/NFtsContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <NFtsContext>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </NFtsContext>
    </>
  );
}

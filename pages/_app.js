import "../styles/globals.css";
import "../styles/intro.css";
import { useLenis } from "../utils/useLenis";

function MyApp({ Component, pageProps }) {
  useLenis();
  return (
    <div className="grain">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

import { Discord } from "../components/DiscordIcon";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="pl-16 pr-16 pt-6 bg-black">
      <nav className="flex flex-row justify-between">
        <span className="flex justify-center items-center">
          <Discord />
          <p className="pl-2 text-2xl font-mono font-thin text-gray-300 ">
            Luda5757
          </p>
        </span>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

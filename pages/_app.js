import "@/styles/globals.css";
import { Provider as UiProvider } from "@/components/ui/provider";
import { Provider as StateProvider} from "react-redux";
import {Navbar, Footer} from "@/components/ui/export";
import store from "../store/index.js";
export default function App({ Component, pageProps }) {

  return <StateProvider store={store}>
    <UiProvider>
    <Navbar/>
    <Component {...pageProps} />
    <Footer/>
    </UiProvider>
    </StateProvider>
}

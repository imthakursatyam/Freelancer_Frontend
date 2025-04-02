import "@/styles/globals.css";
import { Provider as UiProvider } from "@/components/ui/provider";
import { Provider as StateProvider} from "react-redux";
import {Navbar, Footer} from "@/components/ui/export";
import store from "../store/index.js";
import React from "react";
import AuthValidator from "@/services/AuthValidator.js";
import { useRouter } from "next/router.js";
import PageSpinner from "@/components/custom/PageSpinner.js";


export default function App({ Component, pageProps }) {
  const [progress, setProgress] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(true);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(false);
    });
  }, []);
 


  return <>
  
    <StateProvider store={store}>
     
    <UiProvider>
     <Navbar/>
    <PageSpinner Loading={progress} />
    <AuthValidator/>

    <Component {...pageProps} />
    <Footer/>
    </UiProvider>
    </StateProvider>
    </>
}

import "../styles/globals.css";
import { Provider } from "react-redux";
import Header from "../components/Layout/Header";
import stores from "../stores";
import AddImageModal from "../components/Modals/AddImage";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { Toaster } from "react-hot-toast";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../helpers/firebase";
import AreYouSure from "../components/Modals/AreYouSure";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem("userToken") == null) {
      localStorage.setItem("userToken", nanoid(10));
      const docRef = doc(db, "userImages", localStorage.getItem("userToken"));
      const addPromise = setDoc(
        docRef,
        {
          images: [],
        },
        { merge: true }
      );
    }
  }, []);
  return (
    <Provider store={stores}>
      <Toaster />
      <AddImageModal />
      <AreYouSure />
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

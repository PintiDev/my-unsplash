import { doc, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../helpers/firebase";
import ImageItem from "../components/ImageItem";
import Head from "next/head";
import { useSelector } from "react-redux";
const Index = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      const docRef = doc(db, "userImages", localStorage.getItem("userToken"));
      onSnapshot(docRef, (snap) => {
        setData(snap.data()?.images);
      });
    }
  }, []);
  const { query } = useSelector((state) => state.search);
  return (
    <div className="px-36 p-4 masonry sm:masonry-sm md:masonry-md space-y-4  ">
      <Head>
        <title>My unsplash by PintiDevAziz</title>
      </Head>
      {data == null ? (
        <div className="w-56 absolute top-20 left-[calc(50%-10rem)]  mx-auto mt-10 h-56 border-[10px] rounded-full border-gray-300 border-r-themeGreen animate-spin"></div>
      ) : data.length === 0 ? (
        <div className="text-2xl text-gray-400 tracking-widest animate-pulse text-center  absolute left-1/2 -translate-x-1/2 ">
          You don't have any Image{" "}
        </div>
      ) : (
        <>
          {data.filter((item) => item.imgLabel.toLowerCase().includes(query))
            .length == 0 ? (
            <div className="text-2xl">
              Can't find <b>{query}</b>
            </div>
          ) : (
            data
              .filter((item) => item.imgLabel.toLowerCase().includes(query))
              .reverse()
              .map((img, key) => <ImageItem key={key} detail={img} />)
          )}
        </>
      )}
    </div>
  );
};

export default Index;

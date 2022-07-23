import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../helpers/firebase";
import { setAreYouSureData, toggleareYouSure } from "../stores/modalStatus";

const ImageItem = ({ detail }) => {
  const dispatch = useDispatch();

  return (
    <div className="rounded-lg overflow-hidden relative group hover:scale-[1.01] hover:shadow-lg transition-all ">
      <img src={detail.imgUrl} />
      <button
        onClick={() => {
          dispatch(setAreYouSureData(detail));
          dispatch(toggleareYouSure());
        }}
        className="text-red-500 border transition-transform rounded-full px-3 py-1 border-red-500 absolute top-2 right-2 group-hover:translate-x-0 translate-x-[10rem]"
      >
        Delete
      </button>
      <h2 className="absolute shadow-lg px-4 pb-4 font-bold text-lg bottom-0 transition-transform text-white group-hover:translate-y-0 translate-y-full">
        {detail.imgLabel}
      </h2>
    </div>
  );
};

export default ImageItem;

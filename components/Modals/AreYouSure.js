import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleareYouSure } from "../../stores/modalStatus";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../helpers/firebase";
const AreYouSure = () => {
  const { areYouSure, areYouSureData } = useSelector(
    (state) => state.modalStatus
  );
  const dispatch = useDispatch();
  const deleteImage = () => {
    const docRef = doc(db, "userImages", localStorage.getItem("userToken"));
    onSnapshot(docRef, (snap) => {
      updateDoc(docRef, {
        images: snap
          .data()
          .images.filter((item) => item.id !== areYouSureData.id),
      });
    });
    dispatch(toggleareYouSure());
  };
  return (
    <div
      className={`absolute flex items-center justify-center  transition-transform top-0 left-0 w-full h-full bg-black/30 z-[99999]  ${
        areYouSure ? "scale-100" : "scale-0"
      }`}
    >
      <div className="bg-white rounded-lg p-6 flex flex-col gap-y-4 w-[35rem]">
        <h2 className="font-semibold text-xl">
          Are you sure to delete {areYouSureData?.imgLabel}
        </h2>
        <img
          src={areYouSureData?.imgUrl}
          alt=""
          className="h-[20rem] object-cover rounded-lg"
        />
        <div className="flex place-content-end gap-x-4">
          <button
            onClick={() => {
              dispatch(toggleareYouSure());
            }}
            className="text-white bg-red-500 flex items-center justify-center h-10 w-28 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={deleteImage}
            className="text-white bg-themeGreen flex items-center justify-center h-10 w-28 rounded-md"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSure;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddImageModal } from "../../stores/modalStatus";
import Input from "./Input";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { db } from "../../helpers/firebase";
const AddImage = () => {
  const { addImageModal } = useSelector((state) => state.modalStatus);
  const dispatch = useDispatch();
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [valid, setValid] = useState(false);
  const [urlRegex] = useState(
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  const addImageDataBase = async () => {
    const id = nanoid();
    const docRef = doc(db, "userImages", localStorage.getItem("userToken"));
    const addPromise = updateDoc(docRef, {
      images: arrayUnion({
        imgLabel: label,
        imgUrl: url,
        addedTime: new Date().toISOString(),
        id,
      }),
    });
    toast.promise(addPromise, {
      loading: "Image adding",
      success: "Image added",
      error: "Can't add image ",
    });
    addPromise.then(() => {
      setUrl("");
      setLabel("");
      dispatch(toggleAddImageModal());
    });
  };
  useEffect(() => {
    if (url.match(urlRegex) && label) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [url, label]);
  return (
    <div
      className={`absolute flex items-center justify-center  transition-transform top-0 left-0 w-full h-full bg-black/30 z-[99999]  ${
        addImageModal ? "scale-100" : "scale-0"
      }`}
    >
      <div className="bg-white rounded-lg p-6 flex flex-col gap-y-4 w-[35rem]">
        <h2 className="font-semibold text-xl">Add a new photo</h2>
        <Input
          value={label}
          setValue={setLabel}
          headText={"Label"}
          placeholder={"Suspendiese elit massa"}
        />
        <Input
          value={url}
          setValue={setUrl}
          headText={"PhotoUrl"}
          placeholder={"Your image link over here"}
        />
        <div className="flex place-content-end gap-x-3">
          <button
            className="text-gray-400 px-4 py-2"
            onClick={() => {
              dispatch(toggleAddImageModal());
            }}
          >
            Cancel
          </button>
          <button
            disabled={!valid}
            onClick={valid && addImageDataBase}
            className="rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-themeGreen text-white px-4 py-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddImage;

import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toggleAddImageModal } from "../../stores/modalStatus";
import { setQuery } from "../../stores/search";
const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className="px-36 flex items-center justify-between h-20">
      <div className="flex items-center gap-x-4">
        <img src="/my_unsplash_logo.svg" alt="" className="h-8" />
        <label className="flex items-center relative w-[20rem] group">
          <AiOutlineSearch className="absolute left-3 text-xl text-gray-500 transition-colors group-focus-within:text-gray-700" />
          <input
            type="text"
            onChange={(e) => {
              dispatch(setQuery(e.target.value));
            }}
            placeholder="Search By Name"
            className="outline-none border group-focus-within:border-gray-700 transition-colors border-gray-400 rounded-md px-2 pl-10  w-full h-12"
          />
        </label>
      </div>
      <button
        onClick={() => {
          dispatch(toggleAddImageModal());
        }}
        className="px-5 rounded-md py-3 bg-themeGreen text-white"
      >
        Add a photo
      </button>
    </div>
  );
};

export default Header;

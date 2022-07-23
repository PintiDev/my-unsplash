import React from "react";

const Input = ({ headText, placeholder, value, setValue }) => {
  return (
    <label className="w-full">
      <div className="text-sm  mb-2 font-semibold text-gray-700">
        {headText}
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="outline-none rounded-md border border-gray-500 px-2 h-12 w-full"
      />
    </label>
  );
};

export default Input;

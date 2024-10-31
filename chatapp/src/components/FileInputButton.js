import React, { useRef } from "react";
import { GrGallery } from "react-icons/gr";
const FileInputButton = ({ onFileSelect, selectedFile }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        onChange={onFileSelect}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="  p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 active:bg-blue-500"
      >
        <GrGallery />
      </button>
    </>
  );
};
export default FileInputButton;

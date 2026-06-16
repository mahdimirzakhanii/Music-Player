"use client";
import { useHandleChangeUploadFile } from "@/hooks/useHandleChangeUploadFile";

const MainUploadMusic = () => {
  const { handleChange } = useHandleChangeUploadFile();

  return (
    <>
      <input
        type="file"
        accept="audio/*"
        multiple
        onChange={handleChange}
        id="upload"
        className="hidden"
      />
      <label
        htmlFor="upload"
        className="flex items-center justify-center gap-2 py-2 w-40 border border-gray-600 active:border-gray-100 active:bg-white/10 rounded-md duration-300 cursor-pointer"
      >
        Upload Files
      </label>
    </>
  );
};

export default MainUploadMusic;

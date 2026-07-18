"use client";
import { useHandleChangeUploadFile } from "@/hooks/useHandleChangeUploadFile";
import Folder from "../icons/Folder";

interface Props {
  header?: boolean;
}

const MainUploadMusic = ({ header }: Props) => {
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
        className="flex items-center justify-center gap-2 py-2 w-full border border-gray-600 active:border-emerald-800 active:bg-emerald-800/50 rounded-md duration-300 cursor-pointer"
      >
        <span
          className={`${header && "hidden"} md:block text-sm lg:text-base border-r pr-2 border-gray-700`}
        >
          Upload Files
        </span>
        <Folder className="w-5" />
      </label>
    </>
  );
};

export default MainUploadMusic;

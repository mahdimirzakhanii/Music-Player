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
        accept="audio/*,.mp3,.m4a,.wav,.flac,.aac,.ogg,.wma"
        multiple
        onChange={handleChange}
        id="upload"
        className="hidden"
      />
      <label
        htmlFor="upload"
        className="flex items-center justify-center gap-2 py-2 w-full border border-emerald-500 text-emerald-500
        active:text-white active:bg-emerald-800 rounded-md duration-300 cursor-pointer"
      >
        <span
          className={`${header && "hidden"} md:block text-sm lg:text-base border-r-2 pr-2 border-emerald-900`}
        >
          Upload Files
        </span>
        <Folder className="w-5" />
      </label>
    </>
  );
};

export default MainUploadMusic;

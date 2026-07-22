"use client";
import { useFilesStore } from "@/stores/filesStore";
import { MusicMeta } from "@/types/Types";
import Image from "next/image";
import { useState } from "react";
import Icon from "../Icon";
import MainUploadMusic from "../upload-music/MainUploadMusic";
import { usePlayerStore } from "@/stores/playerStore";

const ListRecently = () => {
  const { files, emptyListSearch, searchFiles, setFileSelected } =
    useFilesStore();
  const { audioElement, setIsPlaying } = usePlayerStore();
  const [mouseEvent, setMouseEvent] = useState<null | number>(null);

  const shortText = (text: string) => {
    if (text?.length > 20) {
      return text.slice(0, 20) + "...";
    }
    return text;
  };

  const selectFile = async (item: MusicMeta) => {
    await setFileSelected(item);
    audioElement?.play();
    setIsPlaying(true);
  };

  // Empty list before uplaod files
  if (files?.length <= 0) {
    return (
      <div className="flex flex-col gap-5 w-full items-center min-h-[45vh] md:min-h-[50vh] justify-center">
        <Icon name="musicSlash" className="w-16 lg:w-24" />
        <span className="text-2xl xl:text-4xl font-bold text-white/80">Empty List</span>
        <div className="flex items-center justify-center w-[45%] sm:w-[30%] lg:w-[20%] xl:w-[15%]">
          <MainUploadMusic />
        </div>
      </div>
    );
  }

  // Empty list after search
  if (emptyListSearch) {
    return (
      <div className="flex items-center justify-center w-full min-h-[60vh] gap-3 flex-col">
        <span className="text-xl font-bold text-white/80">No results</span>
        <span className="text-lg text-white/80">
          Try searching for something else
        </span>
      </div>
    );
  }

  // List upload files
  const finalList = searchFiles?.length <= 0 ? files : searchFiles;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-10 w-full ">
      {finalList?.map((item: MusicMeta, index) => {
        return (
          <div
            key={index}
            onClick={() => selectFile(item)}
            onMouseMove={() => setMouseEvent(index)}
            onMouseLeave={() => setMouseEvent(null)}
            className="flex items-center flex-col justify-between relative px-2 w-full gap-2 rounded-md cursor-pointer min-h-55"
          >
            {/* Hover */}
            {mouseEvent === index && (
              <div
                className="min-w-full min-h-[108%] h-[108%] flex items-center justify-center rounded-lg absolute -top-2 z-50 opacity-10"
                style={{ background: "#23d069" }}
              ></div>
            )}

            <div className="min-h-42 max-h-42 w-full relative flex items-center justify-center overflow-hidden">
              {mouseEvent === index && (
                <Icon name="play" className="absolute w-10 z-50" />
              )}
              {item?.coverUrl ? (
                <Image
                  className="rounded-lg "
                  src={item?.coverUrl}
                  fill
                  alt={item?.title ?? ""}
                  // onError={(e) => {
                  //   e.currentTarget.src = "/default-music-cover.png"; // Fallback
                  // }}
                />
              ) : (
                <Icon name="music" className="w-20" />
              )}
            </div>
            <span className="text-sm">{shortText(item?.title ?? "")}</span>
            <span className="text-sm">{shortText(item?.artist ?? "")}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ListRecently;

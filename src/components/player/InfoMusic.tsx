"use client";
import { useFilesStore } from "@/stores/filesStore";
import Image from "next/image";
import Icon from "../Icon";

const InfoMusic = () => {
  const fileSelected = useFilesStore((state) => state.fileSelected);
  if (!fileSelected) return;
  return (
    <div className="flex items-center justify-start gap-3 basis-[30%]">
      <div className="relative flex items-center justify-center w-24 h-24 ">
        {fileSelected?.coverUrl ? (
          <Image
            src={fileSelected?.coverUrl}
            alt="cover"
            fill
            className="rounded-md"
            // onError={(e) => {
            //   e.currentTarget.src = "/default-music-cover.png"; // Fallback
            // }}
          />
        ) : (
          <Icon name="music" className="w-20" />
        )}
      </div>
      <div className="flex items-start flex-col justify-center min-h-full">
        <span className="font-bold">{fileSelected?.title ?? ""}</span>
        <span className="text-gray-300">{fileSelected?.artist ?? ""}</span>
      </div>
    </div>
  );
};

export default InfoMusic;

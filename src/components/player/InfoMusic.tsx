"use client";
import { useFilesStore } from "@/stores/filesStore";
import Image from "next/image";
import Icon from "../Icon";

const InfoMusic = () => {
  const fileSelected = useFilesStore((state) => state.fileSelected);
  if (!fileSelected) return;
  return (
    <div className="hidden md:flex items-center justify-start gap-2 basis-[30%]">
      <div className="relative flex items-center justify-center min-w-24 min-h-24">
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
          <Icon name="music" className="w-24" />
        )}
      </div>
      <div className="flex items-start flex-col justify-center min-h-full">
        <span className="font-bold " title={fileSelected?.title || ""}>
          {fileSelected?.title && fileSelected?.title?.length > 30
            ? fileSelected?.title?.slice(0, 30) + "..."
            : (fileSelected?.title ?? "")}
        </span>
        <span
          className="text-gray-300 "
          title={fileSelected?.artist || ""}
        >
          {fileSelected?.artist && fileSelected?.artist?.length > 30
            ? fileSelected?.artist?.slice(0, 30) + "..."
            : (fileSelected?.artist ?? "")}
        </span>
      </div>
    </div>
  );
};

export default InfoMusic;

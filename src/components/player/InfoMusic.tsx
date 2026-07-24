"use client";
import { useFilesStore } from "@/stores/filesStore";
import Image from "next/image";
import Icon from "../Icon";

const InfoMusic = () => {
  const fileSelected = useFilesStore((state) => state.fileSelected);
  if (!fileSelected) return;
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-2 w-full md:basis-[30%]">
      <div className="relative flex items-center justify-center min-w-48 min-h-48 max-w-48 max-h-48 md:min-w-24 md:min-h-24 md:max-w-24 md:max-h-24">
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
        <span className="text-gray-300 " title={fileSelected?.artist || ""}>
          {fileSelected?.artist && fileSelected?.artist?.length > 30
            ? fileSelected?.artist?.slice(0, 30) + "..."
            : (fileSelected?.artist ?? "")}
        </span>
      </div>
    </div>
  );
};

export default InfoMusic;

"use client";
import { useFilesStore } from "@/stores/filesStore";
import Controller from "./Controller";
import InfoMusic from "./InfoMusic";
import DurationSlider from "./DurationSlider";
import { useRef } from "react";
import VolumeSlider from "./VolumeSlider";

const MainPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { fileSelected } = useFilesStore();

  return (
    <div className="flex z-999 fixed items-end md:items-start gap-3 w-full px-4 md:px-10 py-8 md:py-3 min-h-24 md:min-h-32 bottom-0 bg-zinc-900/50 backdrop-blur-lg">
      <div className="relative flex flex-row-reverse md:flex-row items-center justify-between w-full">
        <InfoMusic />
        <div className="block md:hidden w-full absolute -top-8">
          <DurationSlider audioRef={audioRef} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 w-[85%] md:w-[30%] flex flex-col items-center justify-center gap-5">
          <div className="hidden md:flex w-full">
            <DurationSlider audioRef={audioRef} />
          </div>
          <Controller />
        </div>
        {/* Volume SliderF */}
        <VolumeSlider />
        <audio
          src={fileSelected?.audioUrl ?? undefined}
          ref={audioRef}
          className="hidden"
        />
      </div>
    </div>
  );
  // );
};

export default MainPlayer;

"use client";
import { useFilesStore } from "@/stores/filesStore";
import Controller from "./Controller";
import InfoMusic from "./InfoMusic";
import DurationSlider from "./DurationSlider";
import { useEffect, useRef, useState } from "react";
import VolumeSlider from "./VolumeSlider";
import ArrowUp from "../icons/ArrowUp";
import ArrowDown from "../icons/ArrowDown";

const MainPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { fileSelected } = useFilesStore();
  const [showInfoMusic, setShowInfoMusic] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 10);
  }, []);

  return (
    fileSelected && (
      <div
        className={`flex z-999 fixed items-end justify-center md:items-start border-t border-t-white/10 gap-3 w-full px-6 md:px-10 py-8 md:py-3 md:min-h-32 bottom-0 bg-zinc-900/50 backdrop-blur-lg ${showInfoMusic ? "min-h-screen" : "min-h-28"}`}
      >
        <div
          onClick={() => setShowInfoMusic(!showInfoMusic)}
          className={`flex md:hidden absolute rounded-md p-1 border-b-0 right-5 z-999  bg-zinc-900/50 backdrop-blur-lg
          ${showInfoMusic ? "bottom-28.5" : "-top-7.5"}
          `}
        >
          {!showInfoMusic ? (
            <ArrowUp className="w-5 font-black" />
          ) : (
            <ArrowDown className="w-5 font-black" />
          )}
        </div>
        <div
          className={`transform transition-all w-full md:hidden bg-amber-400 absolute duration-700 min-h-[90vh]
            ${
              showInfoMusic
                ? "flex items-center justify-center translate-y-0"
                : "translate-y-full hidden"
            } `}
        >
          <InfoMusic />
        </div>

        <div className="relative flex flex-row-reverse md:flex-row items-center justify-between w-full">
          <div className="hidden md:block ">
            <InfoMusic />
          </div>

          <div className="block md:hidden w-full absolute -top-9">
            <DurationSlider audioRef={audioRef} />
          </div>
          <div className="absolute left-1/2 -translate-x-[55%] w-[93%] md:w-[30%] flex flex-col items-center justify-center gap-5">
            <div className="hidden md:flex w-full">
              <DurationSlider audioRef={audioRef} />
            </div>
            <Controller />
          </div>

          <VolumeSlider />
          <audio
            src={fileSelected?.audioUrl ?? undefined}
            ref={audioRef}
            className="hidden"
          />
        </div>
      </div>
    )
  );
};

export default MainPlayer;

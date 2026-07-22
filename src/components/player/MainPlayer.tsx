"use client";
import { useFilesStore } from "@/stores/filesStore";
import Controller from "./Controller";
import InfoMusic from "./InfoMusic";
import DurationSlider from "./DurationSlider";
import { useRef, useState } from "react";
import { usePlayerStore } from "@/stores/playerStore";
import Volume from "../icons/Volume";
import VolumeOff from "../icons/VolumeOff";
import { Slider } from "@/components/ui/slider";

const MainPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { fileSelected } = useFilesStore();
  const { audioElement, setPlayerVolume } = usePlayerStore();
  const [volume, setVolume] = useState<number>(50);

  // Handle Volume
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioElement) {
      setPlayerVolume(newVolume / 100);
    }
  };

  return (
    <div className="flex z-999 fixed items-end md:items-start gap-3 w-full px-4 md:px-10 py-8 md:py-3 min-h-24 md:min-h-32 bottom-0 bg-zinc-900/80 backdrop-blur-sm">
      <div className="relative flex items-center justify-between w-full">
        <InfoMusic />
        <div className="block md:hidden w-full absolute -top-10">
          <DurationSlider audioRef={audioRef}/>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 w-[30%] flex flex-col items-center justify-center gap-5">
          <div className="hidden md:flex w-full">
            <DurationSlider audioRef={audioRef}/>
          </div>
          <Controller />
        </div>

        {/* Volume Slider */}
        <div className="w-[30%] md:w-[10%]">
          <div className="w-full hidden md:flex items-center justify-center gap-2">
            {volume === 0 ? (
              <VolumeOff
                onClick={() => {
                  setVolume(20);
                  if (audioElement) {
                    setPlayerVolume(20 / 100);
                  }
                }}
                className="text-white w-5 cursor-pointer"
              />
            ) : (
              <Volume
                onClick={() => {
                  setVolume(0);
                  if (audioElement) {
                    setPlayerVolume(0);
                  }
                }}
                className="text-white w-5 cursor-pointer"
              />
            )}
            <Slider
              value={[volume || 50 / 100]}
              min={0}
              max={100}
              step={1}
              // disabled={!volume}
              onValueChange={handleVolumeChange}
            />
            <audio
              src={fileSelected?.audioUrl ?? undefined}
              ref={audioRef}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
  // );
};

export default MainPlayer;

"use client";
import { useFilesStore } from "@/stores/filesStore";
import Controller from "./Controller";
import InfoMusic from "./InfoMusic";
import Slider from "./Slider";
import { useRef, useState } from "react";
import { usePlayerStore } from "@/stores/playerStore";

const MainPlayer = () => {
  const volumeRef = useRef<HTMLAudioElement>(null);
  const { fileSelected } = useFilesStore();
  const { audioElement } = usePlayerStore();
  const [volume, setVolume] = useState<null | number>(null);

  // Handle Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioElement) {
      audioElement.volume = value / 100;
    }
  };

  return (
    Object?.keys(fileSelected || {}).length === 0 && (
      <div className="flex z-999 fixed items-start gap-3 w-full px-10 py-3 min-h-32 bottom-0 bg-black">
        <div className="flex items-center justify-between w-full">
          <InfoMusic />
          <div className="w-[40%] flex flex-col items-center justify-center gap-5">
            <Slider />
            <Controller />
          </div>

          {/* Volume Slider */}
          <div className="w-[10%] flex items-center justify-center">
            <input
              type="range"
              min={0}
              max={100}
              value={volume || 20}
              onChange={handleVolumeChange}
              style={{
                background: `linear-gradient(to right, #3b82f6 ${volume || 20}%, #d1d5db ${volume || 20}%)`,
              }}
            />
            <audio
              src={fileSelected?.audioUrl ?? undefined}
              ref={volumeRef}
              className="hidden"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default MainPlayer;

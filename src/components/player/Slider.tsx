"use client";
import { useFilesStore } from "@/stores/filesStore";
import { usePlayerStore } from "@/stores/playerStore";
import { useEffect, useRef, useState } from "react";

const Slider = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileSelected = useFilesStore((state) => state.fileSelected);
  const { setAudioElement, setIsPlaying, audioElement } = usePlayerStore();
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (!fileSelected || !audioRef.current) return;
    audioRef.src = fileSelected?.audioUrl;
    audioRef.current.play();
    setIsPlaying(true);
  }, [fileSelected]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudioElement(audio);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [setAudioElement]);

  const progress =
    ((audioElement?.currentTime || 0) / (audioElement?.duration || 0)) * 100;
  return (
    <div className=" flex flex-col w-full">
      <input
        style={{
          background: `linear-gradient(to right, #3b82f6 ${progress}%, #d1d5db ${progress}%)`,
        }}
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime || 0}
        onChange={handleSeek}
      />

      <audio
        ref={audioRef}
        src={fileSelected?.audioUrl ?? undefined}
        className="hidden"
      />
      {/* <div className="h-2 rounded-full w-full bg-white/15">
        <div className="relative h-full rounded-full w-1/3 bg-gold-500"></div>
        <div className="absolute -right-1 -top-1/2 bottom-0 border-4 border-blue-600 hover:border-[3px] duration-100 rounded-full bg-blue-200 w-4 h-4 z-50" />
      </div> */}
    </div>
  );
};

export default Slider;

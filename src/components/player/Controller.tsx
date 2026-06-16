"use client";
import Backward from "../icons/Backward";
import Forward from "../icons/Forward";
import Puase from "../icons/Puase";
import Shuffle from "../icons/Shuffle";
import ShuffleOff from "@/asstes/image/shuffle-off.png";
import RepeatOff from "@/asstes/image/repeat-off.png";
import Image from "next/image";
import { useRef, useState } from "react";
import Repeat from "../icons/Repeat";
import RepeatOne from "../icons/RepeatOne";
import { usePlayerStore } from "@/stores/playerStore";
import { useFilesStore } from "@/stores/filesStore";

const Controller = () => {
  const volumeRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, setIsPlaying, audioElement } = usePlayerStore();
  const { fileSelected, setFileSelected, files } = useFilesStore();
  const [suffle, setSuffle] = useState("off");
  const [repeat, setRepeat] = useState("off");
  const [volume, setVolume] = useState<null | number>(null);

  // Handle Play/Pause
  const handlePlayPause = () => {
    if (!audioElement) return;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioElement) {
      audioElement.volume = value / 100;
    }
  };

  // Handle Previous/Next
  const changeMusic = async (direction: string) => {
    const currentMusic = files.findIndex(
      (item) => item?.id === fileSelected?.id,
    );
    const newIndex = direction === "next" ? currentMusic + 1 : currentMusic - 1;
    const nextSong = files[newIndex];
    if (!nextSong) return;
    await setFileSelected(nextSong);
    setIsPlaying(true);
    audioElement?.play();
  };

  return (
    <div className="flex items-center justify-between gap-3 w-[56%]">
      <div className="flex items-center justify-center gap-3 ">
        {suffle === "off" ? (
          <Image
            onClick={() => setSuffle("on")}
            src={ShuffleOff}
            alt="shuffle"
            className="w-7 cursor-pointer"
          />
        ) : (
          <Shuffle
            onClick={() => setSuffle("off")}
            className="w-7 cursor-pointer"
          />
        )}
        <Backward
          onClick={() => changeMusic("prev")}
          className="w-7 cursor-pointer"
        />
        <Puase onClick={handlePlayPause} className="w-7 cursor-pointer" />
        <Forward
          onClick={() => changeMusic("next")}
          className="w-7 cursor-pointer"
        />

        {repeat === "off" ? (
          <Image
            onClick={() => setRepeat("on")}
            src={RepeatOff}
            alt="ssd"
            className="w-5 cursor-pointer"
          />
        ) : repeat === "on" ? (
          <Repeat
            className="w-7 cursor-pointer"
            onClick={() => setRepeat("one")}
          />
        ) : (
          repeat === "one" && (
            <RepeatOne
              className="w-7 cursor-pointer"
              onClick={() => setRepeat("off")}
            />
          )
        )}
      </div>

      {/* Volume Slider */}
      <div className="flex items-center justify-center">
        <input
          type="range"
          min={0}
          max={100}
          value={volume || 20}
          onChange={handleVolumeChange}
        />
        <audio
          src={fileSelected?.audioUrl ?? undefined}
          ref={volumeRef}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Controller;

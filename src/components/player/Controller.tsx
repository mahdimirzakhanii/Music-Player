"use client";
import Backward from "../icons/Backward";
import Forward from "../icons/Forward";
import Puase from "../icons/Puase";
import Shuffle from "../icons/Shuffle";
import ShuffleOff from "@/asstes/image/shuffle-off.png";
import RepeatOff from "@/asstes/image/repeat-off.png";
import Image from "next/image";
import { useState } from "react";
import Repeat from "../icons/Repeat";
import RepeatOne from "../icons/RepeatOne";
import { usePlayerStore } from "@/stores/playerStore";

const Controller = () => {
  const [suffle, setSuffle] = useState("off");
  const [repeat, setRepeat] = useState("off");
  const { isPlaying, setIsPlaying, audioElement } = usePlayerStore();

  const handlePlayPause = () => {
    if (!audioElement) return;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-center gap-3 w-1/3">
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
      <Backward className="w-7 cursor-pointer" />
      <Puase onClick={handlePlayPause} className="w-7 cursor-pointer" />
      <Forward className="w-7 cursor-pointer" />

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
  );
};

export default Controller;

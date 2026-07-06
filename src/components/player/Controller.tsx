"use client";
import Backward from "../icons/Backward";
import Forward from "../icons/Forward";
import Puase from "../icons/Puase";
import Play from "../icons/Play";
import Shuffle from "../icons/Shuffle";
import { useEffect, useRef, useState } from "react";
import Repeat from "../icons/Repeat";
import RepeatOne from "../icons/RepeatOne";
import { usePlayerStore } from "@/stores/playerStore";
import { useFilesStore } from "@/stores/filesStore";
import ShuffleOff from "../icons/ShuffleOff";
import RepeatOff from "../icons/RepeatOff";

const Controller = () => {
  const volumeRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, setIsPlaying, audioElement } = usePlayerStore();
  const { fileSelected, setFileSelected, files } = useFilesStore();
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<number | boolean>(true);
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

  const currentIndex = files.findIndex((item) => item?.id === fileSelected?.id);

  // Handle Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioElement) {
      audioElement.volume = value / 100;
    }
  };

  // Handle Previous/Next
  const changeMusic = (direction: "next" | "prev") => {
    if (currentIndex === -1) return;
    // Shuffle
    if (shuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * files.length);
      } while (randomIndex === currentIndex);
      setFileSelected(files[randomIndex]);
      return;
    }
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    const nextSong = files[newIndex];
    if (!nextSong) return;
    setFileSelected(nextSong);
  };

  // Repeat
  useEffect(() => {
    if (!audioElement) return;
    const handleEnded = () => {
      const nextIndex = currentIndex + 1;
      if (repeat === true) {
        if (nextIndex < files?.length) {
          setFileSelected(files[nextIndex]);
          setIsPlaying(true);
        } else if (nextIndex >= files?.length) {
          setFileSelected(files[0]);
          setIsPlaying(true);
        }
      } else if (repeat === 1) {
        audioElement.currentTime = 0;
        audioElement.play();
        setIsPlaying(true);
      } else if (!repeat) {
        setIsPlaying(false);
      }
    };
    audioElement.addEventListener("ended", handleEnded);
    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [audioElement, files, fileSelected, repeat, currentIndex]);

 

  return (
    <div className="flex items-center justify-between gap-3 w-[56%]">
      <div className="flex items-center justify-center gap-3 ">
        {!shuffle ? (
          <ShuffleOff
            onClick={() => setShuffle(true)}
            className="w-7 cursor-pointer"
          />
        ) : (
          <Shuffle
            onClick={() => setShuffle(false)}
            className="w-7 cursor-pointer"
          />
        )}
        <Backward
          onClick={() => changeMusic("prev")}
          className="w-7 cursor-pointer"
        />
        {isPlaying ? (
          <Puase onClick={handlePlayPause} className="w-7" />
        ) : (
          <Play onClick={handlePlayPause} className="w-7" />
        )}
        <Forward
          onClick={() => changeMusic("next")}
          className="w-7 cursor-pointer"
        />

        {!repeat ? (
          <RepeatOff
            className="w-7 cursor-pointer"
            onClick={() => setRepeat(1)}
          />
        ) : repeat === 1 ? (
          <RepeatOne
            className="w-7 cursor-pointer"
            onClick={() => setRepeat(true)}
          />
        ) : (
          repeat === true && (
            <Repeat
              className="w-7 cursor-pointer"
              onClick={() => setRepeat(false)}
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
          value={volume || 0}
          onChange={handleVolumeChange}
          style={{
            background: `linear-gradient(to right, #3b82f6 ${volume}%, #d1d5db ${volume}%)`,
          }}
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

"use client";
import Backward from "../icons/Backward";
import Forward from "../icons/Forward";
import Puase from "../icons/Puase";
import Play from "../icons/Play";
import Shuffle from "../icons/Shuffle";
import { useEffect, useState } from "react";
import Repeat from "../icons/Repeat";
import RepeatOne from "../icons/RepeatOne";
import { usePlayerStore } from "@/stores/playerStore";
import { useFilesStore } from "@/stores/filesStore";
import ShuffleOff from "../icons/ShuffleOff";
import RepeatOff from "../icons/RepeatOff";

const Controller = () => {
  const { isPlaying, setIsPlaying, audioElement } = usePlayerStore();
  const { fileSelected, setFileSelected, files } = useFilesStore();
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<number | boolean>(true);

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
          const firstSong = files[0];
          if (firstSong?.id === fileSelected?.id) {
            audioElement.currentTime = 0;
            audioElement.play();
            setIsPlaying(true);
          } else {
            setFileSelected(firstSong);
            setIsPlaying(true);
          }
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

  const className = "w-6 cursor-pointer ";
  return (
    <div className="flex items-center justify-between md:justify-between gap-3 w-full">
      <div className="flex items-center justify-end ">
        {!shuffle ? (
          <ShuffleOff
            onClick={() => setShuffle(true)}
            className={`${className}`}
          />
        ) : (
          <Shuffle
            onClick={() => setShuffle(false)}
            className={`${className}`}
          />
        )}
      </div>
      <div className="flex items-center justify-end gap-3">
        <Backward
          onClick={() => changeMusic("prev")}
          className={`${className}`}
        />
        <div
          onClick={handlePlayPause}
          className="bg-emerald-500 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer"
        >
          {isPlaying ? (
            <Puase className={`${className} `} />
          ) : (
            <Play className={`${className} `} />
          )}
        </div>
        <Forward
          onClick={() => changeMusic("next")}
          className={`${className}`}
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        {!repeat ? (
          <RepeatOff className={`${className}`} onClick={() => setRepeat(1)} />
        ) : repeat === 1 ? (
          <RepeatOne
            className={`${className}`}
            onClick={() => setRepeat(true)}
          />
        ) : (
          repeat === true && (
            <Repeat
              className={`${className}`}
              onClick={() => setRepeat(false)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Controller;

"use client";
import { Slider } from "@/components/ui/slider";
import { useFilesStore } from "@/stores/filesStore";
import { usePlayerStore } from "@/stores/playerStore";
import { useEffect, useRef, useState } from "react";

const DurationSlider = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileSelected = useFilesStore((state) => state.fileSelected);
  const { setAudioElement, setIsPlaying } = usePlayerStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (!fileSelected?.audioUrl || !audioRef.current) return;
    audioRef.current.src = fileSelected.audioUrl;
    audioRef.current.play();
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(0);
  }, [fileSelected, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setAudioElement(audio);

    const handleLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };

    const handleTimeUpdate = () => {
      if (!isSeeking) {
        setCurrentTime(audio.currentTime);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [setAudioElement, isSeeking]);

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="flex w-full flex-col">
      <Slider
        value={[currentTime]}
        min={0}
        max={duration || 1}
        step={0.1}
        disabled={!duration}
        onValueChange={(value) => {
          setIsSeeking(true);
          handleSeek(value);
        }}
        onValueCommit={() => setIsSeeking(false)}
      />

      <audio
        ref={audioRef}
        src={fileSelected?.audioUrl ?? undefined}
        className="hidden"
      />
    </div>
  );
};

export default DurationSlider;

import { useState } from "react";
import VolumeOff from "../icons/VolumeOff";
import Volume from "../icons/Volume";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/playerStore";

const VolumeSlider = () => {
  const [volume, setVolume] = useState<number>(50);
  const [showSliderVolume, setShowSliderVolume] = useState(false);
  const { audioElement, setPlayerVolume } = usePlayerStore();

  // Handle Volume
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioElement) {
      setPlayerVolume(newVolume / 100);
    }
  };
  return (
    <div className="w-fit md:w-[20%] xl:w-[10%]">
      {/* Desktop */}
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
          value={[volume ?? 20]}
          min={0}
          max={100}
          step={1}
          // disabled={!volume}
          onValueChange={handleVolumeChange}
        />
      </div>
      {/* Mobile */}
      <div className="relative w-full flex md:hidden items-center justify-center gap-2">
        <Volume
          className="text-white w-5 cursor-pointer"
          onClick={() => setShowSliderVolume(!showSliderVolume)}
        />
        {showSliderVolume && (
          <div className="absolute -top-9 right-0 flex items-center gap-1 w-32 p-2 bg-zinc-900/30 backdrop-blur-lg border border-white/10 rounded-md">
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
              value={[volume ?? 20]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              aria-label="volume-mobile"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VolumeSlider;

import { PlayerStore } from "@/types/Types";
import { create } from "zustand";

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  isPlaying: false,
  setIsPlaying: (value) => set({ isPlaying: value }),

  audioElement: null,
  setAudioElement: (element) => set({ audioElement: element }),

  setPlayerVolume: (value: number) => {
    const audio = get().audioElement;
    if (audio) {
      audio.volume = value;
    }
  },
}));

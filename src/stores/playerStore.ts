import { PlayerStore } from "@/types/Types";
import { create } from "zustand";

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  setIsPlaying: (value) => set({ isPlaying: value }),
  audioElement: null,
  setAudioElement: (element) => set({ audioElement: element }),
}));

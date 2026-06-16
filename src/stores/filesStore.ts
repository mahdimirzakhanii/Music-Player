import { FileStore } from "@/types/Types";
import { create } from "zustand";

export const useFilesStore = create<FileStore>((set) => ({
  files: [],
  setFiles: (value) =>
    set((state) => ({
      files: typeof value === "function" ? value(state.files) : value,
    })),

  searchFiles: [],
  setSearchFiles: (value) =>
    set((state) => ({
      searchFiles:
        typeof value === "function" ? value(state.searchFiles) : value,
    })),

  emptyListSearch: false,
  setEmptyListSearch: (value) =>
    set(() => ({
      emptyListSearch: value,
    })),

  fileSelected: {},
  setFileSelected: (value) => set(() => ({ fileSelected: value })),
}));

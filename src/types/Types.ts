export type FileStore = {
  files: MusicMeta[] | [];
  setFiles: (value: MusicMeta[] | ((prev: MusicMeta[]) => MusicMeta[])) => void;

  searchFiles: MusicMeta[] | [];
  setSearchFiles: (
    value: MusicMeta[] | ((prev: MusicMeta[]) => MusicMeta[]),
  ) => void;

  emptyListSearch: boolean;
  setEmptyListSearch: (value: boolean) => void;

  fileSelected: MusicMeta | null;
  setFileSelected: (value: MusicMeta | null) => void;
};

export type MusicMeta = {
  id: number | null;
  title: string | null;
  artist: string | null;
  album: string | null;
  coverUrl: string | null;
  duration: number | null;
  audioUrl?: string | null;
};

export interface PlayerStore {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  audioElement: HTMLAudioElement | null;
  setAudioElement: (element: HTMLAudioElement | null) => void;
}

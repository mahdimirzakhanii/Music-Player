"use client";
import { MusicMeta } from "@/types/Types";
import { parseBlob } from "music-metadata-browser";
import { useState } from "react";

export const useReadMusicMetadata = () => {
  const [meta, setMeta] = useState<MusicMeta>({
    id: null,
    title: "",
    artist: "",
    album: "",
    coverUrl: null,
    duration: null,
    audioUrl: null,
  });

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("تبدیل blob به base64 ناموفق بود"));
        }
      };

      reader.onerror = () => reject(reader.error);

      reader.readAsDataURL(blob);
    });
  };

  // Meta file
  const readMusicMetadata = async (file: File) => {
    try {
      const metadata = await parseBlob(file);
      const id = Math.floor(Math.random() * 100);
      const title = metadata.common.title || "";
      const artist = metadata.common.artist || "";
      const album = metadata.common.album || "";
      const duration = metadata.format.duration || null;
      const picture = metadata.common.picture?.[0];
      const audioUrl = URL.createObjectURL(file);
      let coverUrl: string | null = null;

      if (picture) {
        const blob = new Blob([picture?.data], { type: picture.format });
        coverUrl = await blobToBase64(blob);
      }

      const newMeta: MusicMeta = {
        id,
        title,
        artist,
        album,
        coverUrl,
        duration,
        audioUrl,
      };

      setMeta(newMeta);
      return newMeta;
    } catch (error) {
      console.error("Error in reading metadata", error);
      const emptyMeta: MusicMeta = {
        id: null,
        title: null,
        artist: null,
        album: null,
        coverUrl: null,
        duration: null,
        audioUrl: null,
      };

      setMeta(emptyMeta);
      return emptyMeta;
    }
  };

  // Duration file
  const getDuration = (file: File): Promise<number> =>
    new Promise((resolve) => {
      const audio = document.createElement("audio");
      audio.src = URL.createObjectURL(file);

      audio.addEventListener("loadedmetadata", () => {
        resolve(audio.duration);
        URL.revokeObjectURL(audio.src);
      });
    });

  //Bitrate
  const getBitrate = async (file: File, duration: number) => {
    const sizeInBits = file.size * 8;
    return Math.round(sizeInBits / duration / 1000); // kbps
  };

  return { meta, readMusicMetadata, getDuration, getBitrate };
};

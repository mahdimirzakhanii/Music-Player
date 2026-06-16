"use client";
import { useFilesStore } from "@/stores/filesStore";
import { useReadMusicMetadata } from "./readMusicMetaData";

export const useHandleChangeUploadFile = () => {
  const setFiles = useFilesStore((state) => state.setFiles);
  const { readMusicMetadata } = useReadMusicMetadata();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
       if (files?.length === 0) return;
    const metaList = await Promise.all(
      files.map(async (files) => {
        return await readMusicMetadata(files);
      }),
    );
    const valid = metaList.filter(
      (meta) => meta?.title || meta?.artist || meta?.album,
    );
    setFiles((prev) => [...prev, ...valid]);
  };
  return { handleChange };
};

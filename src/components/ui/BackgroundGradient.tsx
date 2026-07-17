"use client";
import { useColorPalette } from "@/hooks/useColorPalette";
import { useFilesStore } from "@/stores/filesStore";

const BackgroundGradient = () => {
  const { fileSelected } = useFilesStore();
  const { palette } = useColorPalette(fileSelected?.coverUrl);

  const gradientStyle = palette
    ? {
        background: `linear-gradient(105deg, ${
          palette.darkVibrant ?? "#0f0f10"
        } 0%, ${palette.darkMuted ?? "#1a1a1a"} 20%, ${
           "#0f0f10"
          // palette.muted ?? "#0f0f10"
        } 100%)`,
        transition: "background 0.8s ease",
      }
    : { background: "#0f0f10" };

  return (
    <div className="fixed -z-10 opacity-50 inset-0 w-full min-h-screen" style={gradientStyle} />
  );
};

export default BackgroundGradient;

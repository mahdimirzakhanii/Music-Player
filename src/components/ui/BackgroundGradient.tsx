"use client";
import { useColorPalette } from "@/hooks/useColorPalette";
import { useFilesStore } from "@/stores/filesStore";

const BackgroundGradient = () => {
  const { fileSelected } = useFilesStore();
  const { palette } = useColorPalette(fileSelected?.coverUrl);
  console.log(palette);

  const gradient = `linear-gradient(105deg, 
    ${palette?.palette?.[1] ?? "#ecfdf5"} 0%,
    ${palette?.palette?.[0] ?? "#a7f3ce"} 20%,
    ${palette?.palette?.[5] ?? "#33d496"} 40%,
    ${palette?.palette?.[4] ?? "#049162"} 60%,
    ${palette?.palette?.[3] ?? "#056044"} 80%,
    ${palette?.palette?.[2] ?? "#022c21"} 100%
  )`;
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
      <div
        className="w-125 h-125 rounded-full blur-[300px] bg-emerald-500 opacity-80 transition-all duration-1000"
        style={{ background: gradient }}
      />
    </div>
  );
};

export default BackgroundGradient;

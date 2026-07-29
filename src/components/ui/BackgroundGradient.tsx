"use client";
import { useColorPalette } from "@/hooks/useColorPalette";
import { useFilesStore } from "@/stores/filesStore";

const BackgroundGradient = () => {
  const { fileSelected } = useFilesStore();
  const { palette } = useColorPalette(fileSelected?.coverUrl);
  console.log(palette);
  const gradientStyle = palette
    ? {
        background: `
radial-gradient(
    circle at 20% 20%,
    ${palette?.palette[0] ?? "#23d069"}40 0%,
    transparent 30%
),
radial-gradient(
    circle at 80% 25%,
    ${palette?.palette[1] ?? "#6c5ce7"}35 0%,
    transparent 30%
),
radial-gradient(
    circle at 50% 90%,
    ${palette?.palette[2] ?? "#fdcb6e"}35 0%,
    transparent 35%
),
radial-gradient(
    circle at 15% 80%,
    ${palette?.palette[3] ?? "#0984e3"}25 0%,
    transparent 40%
),
radial-gradient(
    circle at 85% 75%,
    ${palette?.palette[4] ?? "#d63031"}20 0%,
    transparent 40%
),
#11161B
`,
        //   background: `linear-gradient(105deg,
        //   ${palette?.palette[0] ?? "#0f0f10"} 0%,
        //   ${palette?.palette[1] ?? "#1a1a1a"} 20%,
        //   ${palette?.palette[2] ?? "#0f0f10"} 40%,
        //   ${palette?.palette[3] ?? "#0f0f10"} 60%,
        //   ${palette?.palette[4] ?? "#0f0f10"} 80%,
        //   ${palette?.palette[5] ?? "#0f0f10"} 100%
        // )`,
        transition: "background 0.8s ease",
      }
    : { background: "#0f0f10" };

  return (
    <div
      className="fixed -z-10 opacity-50 inset-0 w-full min-h-screen"
      style={gradientStyle}
    />
  );
};

export default BackgroundGradient;

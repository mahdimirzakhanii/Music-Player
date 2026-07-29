"use client";
import { useEffect, useState } from "react";
import { getColor, getPalette } from "colorthief";
export interface ColorPalette {
  dominant: string;
  palette: string[];
}

export const useColorPalette = (
  imageUrl: string | null | undefined,
  colorCount = 6,
) => {
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!imageUrl) {
      setPalette(null);
      return;
    }
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    setIsLoading(true);
    const extractColors = async () => {
      try {
        const dominantColor = await getColor(img);
        const paletteColors = await getPalette(img, { colorCount });
        if (cancelled) return;
        if (!dominantColor || !paletteColors) {
          setPalette(null);
          return;
        }
        setPalette({
          dominant: dominantColor.hex(),
          palette: paletteColors.map((color) => color.hex()),
        });
      } catch (err) {
        console.error("خطا در استخراج رنگ از تصویر:", err);
        if (!cancelled) setPalette(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    if (img.complete) {
      extractColors();
    } else {
      img.onload = extractColors;
      img.onerror = () => {
        if (cancelled) return;
        console.error("بارگذاری تصویر برای استخراج رنگ ناموفق بود");
        setPalette(null);
        setIsLoading(false);
      };
    }
    return () => {
      cancelled = true;
    };
  }, [imageUrl, colorCount]);
  return {
    palette,
    isLoading,
  };
};

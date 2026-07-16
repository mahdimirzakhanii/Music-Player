"use client";
import { useEffect, useState } from "react";
import { Vibrant } from "node-vibrant/browser";

export interface ColorPalette {
  vibrant?: string;
  darkVibrant?: string;
  lightVibrant?: string;
  muted?: string;
  darkMuted?: string;
  lightMuted?: string;
}

export const useColorPalette = (imageUrl: string | null | undefined) => {
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setPalette(null);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    Vibrant.from(imageUrl)
      .getPalette()
      .then((result) => {
        if (isCancelled) return;

        setPalette({
          vibrant: result.Vibrant?.hex,
          darkVibrant: result.DarkVibrant?.hex,
          lightVibrant: result.LightVibrant?.hex,
          muted: result.Muted?.hex,
          darkMuted: result.DarkMuted?.hex,
          lightMuted: result.LightMuted?.hex,
        });
      })
      .catch((error) => {
        console.error("خطا در استخراج رنگ از تصویر:", error);
        if (!isCancelled) setPalette(null);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [imageUrl]);

  return { palette, isLoading };
};

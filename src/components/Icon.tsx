import dynamic from "next/dynamic";

const icons = {
  play: dynamic(() => import("./icons/Play")),
  threeDots: dynamic(() => import("./icons/ThreeDots")),
  music: dynamic(() => import("./icons/Music")),
  musicSlash: dynamic(() => import("./icons/MusicSlash")),
  forward: dynamic(() => import("./icons/Forward")),
  backward: dynamic(() => import("./icons/Backward")),
  shuffle: dynamic(() => import("./icons/Shuffle")),
  puase: dynamic(() => import("./icons/Puase")),
  repeat: dynamic(() => import("./icons/Repeat")),
} satisfies Record<string,any>;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
}

export default function Icon({ name, className }: IconProps) {
  const Component = icons[name];

  return <Component className={className} />;
}

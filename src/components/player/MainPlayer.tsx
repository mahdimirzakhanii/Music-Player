import Controller from "./Controller";
import InfoMusic from "./InfoMusic";
import Slider from "./Slider";

const MainPlayer = () => {
  return (
    <div className="flex z-999 fixed flex-col items-start gap-3 w-full px-10 py-3 min-h-32  bottom-0 bg-black">
      <Slider />
      <div className="flex items-center justify-between w-full">
        <InfoMusic />
        <Controller />
      </div>
    </div>
  );
};

export default MainPlayer;

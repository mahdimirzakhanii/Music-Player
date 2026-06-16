import ListRecently from "./ListRecently";

const MainHome = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <span className="w-full flex items-center justify-start text-2xl font-bold ">
        Recent media
      </span>
      <ListRecently />
    </div>
  );
};

export default MainHome;

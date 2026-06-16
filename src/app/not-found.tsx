import Icon from "@/components/Icon";

const notFound = () => {
  return (
    <div className="flex items-center gap-5 flex-col justify-center w-full min-h-[60vh]">
      <div className="flex items-center justify-center ">
        <span className="text-9xl text-yellow-600 font-serif ">4</span>
        <Icon name="face" className="w-32 text-yellow-600 mt-7" />
        <span className="text-9xl text-yellow-600 font-serif ">4</span>
      </div>
      <span className="text-5xl">Page Not Found</span>
    </div>
  );
};

export default notFound;

import Face from "@/components/icons/Face";

const notFound = () => {
  return (
    <div className="flex items-center gap-5 flex-col justify-center w-full min-h-[60vh]">
      <div className="flex items-center justify-center ">
        <span className="text-9xl text-emerald-600 font-serif ">4</span>
        <Face className="w-32 text-emerald-600 mt-7" />
        <span className="text-9xl text-emerald-600 font-serif ">4</span>
      </div>
      <span className="text-5xl text-emerald-200">Page Not Found</span>
    </div>
  );
};

export default notFound;

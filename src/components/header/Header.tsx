"use client";
import Image from "next/image";
import Logo from "@/asstes/image/logo.png";
import Dots from "@/asstes/svg/dots-three.svg";
import { useFilesStore } from "@/stores/filesStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { MusicMeta } from "@/types/Types";
import { useEffect } from "react";
import MainUploadMusic from "../upload-music/MainUploadMusic";

const Header = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const files = useFilesStore((state) => state?.files);
  const searchFiles = useFilesStore((state) => state?.searchFiles);
  const setSearchFiles = useFilesStore((state) => state?.setSearchFiles);
  const setEmptyListSearch = useFilesStore(
    (state) => state?.setEmptyListSearch,
  );

  const { watch, register, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
    mode: "onChange",
  });
  const valueSeach = watch("search");

  // Handle Searchdfdf
  const searchSubmit = () => {
    const params = new URLSearchParams(searchParams);
    params.set("search", valueSeach);
    if (!valueSeach && searchFiles?.length <= 0) {
      params.delete("search");
      setSearchFiles([]);
    }
    // no results
    const urlSearch = params.get("search");
    if (urlSearch && searchFiles?.length <= 0) {
      setEmptyListSearch(true);
    } else {
      setEmptyListSearch(false);
    }
    setSearchFiles(
      files?.filter((item: MusicMeta) =>
        item?.title?.toLowerCase()?.includes(valueSeach?.toLowerCase()),
      ),
    );
    router.push(`?${params.toString()}`);
  };

  // Delete query in url
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!valueSeach && files?.length <= 0) {
      params.delete("search");
      router.replace(`?${params.toString()}`);
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full py-3 ">
      <div className="flex items-center justify-between w-[95%] xl:w-[80%]">
        <Image src={Logo} alt="logo" className="w-12 " />
        <form className="w-[70%] xl:w-1/2" onSubmit={handleSubmit(searchSubmit)}>
          <input
            type="text"
            {...register("search")}
            placeholder="Search"
            className="bg-white/10 placeholder:text-white/40 focus:border border-emerald-500 text-white p-2 rounded-md w-full focus:outline-0 "
          />
        </form>
        <div className=" w-[10%] md:w-[20%] xl:w-[15%] 2xl:w-[12%]">
        <MainUploadMusic header={true} />
        </div>
        {/* <Image src={Dots} alt="dots" className="w-10 cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default Header;

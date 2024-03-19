"use client";

import Image from "next/image";

import { Input } from "@/components/ui/input";

interface Props {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) => {
  return (
    <div className="relative w-full">
      <div
        className={`background-light800_darkgradient flex  min-h-[56px] grow items-center gap-1 rounded-xl px-4 ${otherClasses}`}
      >
        {iconPosition === "left" && (
          <Image
            src={imgSrc}
            alt="search"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          className="paragraph-regular text-dark400_light700 placeholder no-focus border-none bg-transparent shadow-none outline-none"
        />
        {iconPosition === "right" && (
          <Image
            src={imgSrc}
            alt="search"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default LocalSearch;

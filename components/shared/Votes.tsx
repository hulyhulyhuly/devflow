"use client";

import Image from "next/image";

interface Props {
  // TODO
}

const Votes = () => {
  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex items-center justify-between ">
        <Image
          src="/assets/icons/upvote.svg"
          alt="upvote"
          width={20}
          height={20}
          className="cursor-pointer object-contain"
          onClick={() => {}}
        />
        <p className="rounded-md bg-gray-300 p-1">{0}</p>
      </div>

      <div className="flex items-center justify-between">
        <Image
          src="/assets/icons/downvote.svg"
          alt="downvote"
          width={20}
          height={20}
          className="cursor-pointer object-contain"
          onClick={() => {}}
        />
        <p className="rounded-md bg-gray-300 p-1">{0}</p>
      </div>
    </div>
  );
};

export default Votes;

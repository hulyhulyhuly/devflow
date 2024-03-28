import Image from "next/image";
import Link from "next/link";

import RenderTag from "../shared/RenderTag";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { Badge } from "lucide-react";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <div className="card-wrapper light-border flex flex-col items-center justify-center rounded-xl border p-9 sm:px-11">
      <Link
        href={`/profile/${user.clerkId}`}
        className="flex-center flex-col gap-1"
      >
        <Image
          src={user.picture}
          alt="user profile picture"
          width={100}
          height={100}
          className="rounded-full object-contain"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2 line-clamp-1">
            @{user.username}
          </p>
        </div>
      </Link>

      <div className="mt-6">
        {interactedTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {interactedTags.map((tag) => (
              <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
            ))}
          </div>
        ) : (
          <Badge>No tags yet</Badge>
        )}
      </div>
    </div>
  );
};

export default UserCard;

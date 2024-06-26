import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";

import Metric from "@/components/shared/Metric";
import EditDeleteAction from "@/components/shared/EditDeleteAction";
import { getTimestamp, formatAndDivideNumber } from "@/lib/utils";

interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  createdAt: Date;
}

const AnswerCard = ({ clerkId, _id, question, author, upvotes, createdAt }: Props) => {
  const showActionButton = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-xl border p-9 sm:px-11">
      <div>
        <span className="subtle-regular text-dark400_light700 mb-1 line-clamp-1 flex sm:hidden">
          {getTimestamp(createdAt)}
        </span>

        <Link href={`/question/${question._id}/#${_id}`}>
          <h3 className="h3-bold text-dark200_light900">{question.title}</h3>
        </Link>

        {/* If signed in, add 'edit' & 'delete' actions */}
        <SignedIn>{showActionButton && <EditDeleteAction type={"answer"} itemId={JSON.stringify(_id)} />}</SignedIn>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-1 mt-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` • asked ${getTimestamp(createdAt)}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />

        <div className="flex items-center justify-evenly gap-4">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title={`Votes`}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;

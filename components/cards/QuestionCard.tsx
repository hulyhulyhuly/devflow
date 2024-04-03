import Link from "next/link";

import Metric from "../shared/Metric";
import RenderTag from "../shared/RenderTag";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";

interface Props {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) => {
  return (
    <div className="card-wrapper rounded-xl border p-9 sm:px-11">
      <div>
        <span className="subtle-regular text-dark400_light700 mb-1 line-clamp-1 flex sm:hidden">
          {getTimestamp(createdAt)}
        </span>

        <Link href={`/question/${_id}`}>
          <h3 className="h3-bold text-dark200_light900">{title}</h3>
        </Link>

        {/* If signed in, add 'edit' & 'delete' actions */}
      </div>

      <div className="mb-6 mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-1">
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

          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="answers"
            value={formatAndDivideNumber(answers.length)}
            title={`Answers`}
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="views"
            value={formatAndDivideNumber(views)}
            title={`Views`}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

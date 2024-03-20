import Link from "next/link";

import Metric from "../shared/Metric";
import RenderTag from "../shared/RenderTag";

interface Props {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: number;
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
      <Link href={`/question/${_id}`}>
        <h3 className="h3-bold text-dark200_light900">{title}</h3>
      </Link>

      {/* If signed in, add 'edit' & 'delete' actions */}

      <div className="mb-6 mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex w-full flex-wrap items-center justify-between">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={author.name}
          title={` • asked 
            ${Math.round(
              (Date.now() - createdAt.getTime()) / (1000 * 3600 * 24)
            )} days ago`}
        />

        <div className="flex items-center justify-evenly gap-4">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={upvotes}
            title={`Votes`}
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="answers"
            value={answers}
            title={`Answers`}
            textStyles="small-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="views"
            value={views}
            title={`Views`}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

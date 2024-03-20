import Image from "next/image";

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
    <div className="card-wrapper rounded-xl border px-4 py-2">
      <h3 className="h3-bold text-dark200_light900">{title}</h3>

      <div className="my-6 flex gap-4">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/icons/avatar.svg"
            alt="author"
            width={20}
            height={20}
            className="invert-colors overflow-auto rounded-full object-cover"
          />
          <p>{author.name}</p>
          <span>·</span>
          <p className="text-sm font-thin">
            asked&nbsp;
            {Math.round(
              (Date.now() - createdAt.getTime()) / (1000 * 3600 * 24)
            )}
            days ago
          </p>
        </div>

        <div className="flex items-center justify-evenly gap-4">
          <div className="flex items-center gap-1">
            <Image
              src="/assets/icons/like.svg"
              width={16}
              height={16}
              alt="vote"
            />
            <p>{upvotes} Votes</p>
          </div>

          <div className="flex items-center gap-1">
            <Image
              src="/assets/icons/message.svg"
              width={16}
              height={16}
              alt="vote"
            />
            <p>{answers} Answers</p>
          </div>

          <div className="flex items-center gap-1">
            <Image
              src="/assets/icons/eye.svg"
              width={16}
              height={16}
              alt="vote"
            />
            <p>{views} Views</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

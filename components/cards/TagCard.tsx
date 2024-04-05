import { formatAndDivideNumber } from "@/lib/utils";
import Link from "next/link";

interface Props {
  tag: {
    _id: string;
    name: string;
    description?: string;
    questions: string[];
  };
}

const TagCard = ({ tag }: Props) => {
  return (
    <Link href={`/tags/${tag._id}`} className="shadow-light100_darknone">
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
        <div className="background-light800_dark400 w-fit rounded-sm px-4 py-2">
          <p className="paragraph-semibold text-dark300_light900">{tag.name}</p>
        </div>

        <p className="body-regular text-dark400_light500 mt-3">Description of Tag</p>

        <p className="small-medium text-dark400_light500 mt-3">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {formatAndDivideNumber(tag.questions.length)}+
          </span>{" "}
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;

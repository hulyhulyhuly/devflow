import { getAnswers } from "@/lib/actions/answer.action";
import ParseHTML from "./ParseHTML";
import Image from "next/image";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filter";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";
import Votes from "./Votes";

interface Props {
  questionId: string;
  totalAnswers: number;
  userId: string;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  totalAnswers,
  userId,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({ questionId });

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="mb-8 flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  alt="profile"
                  width={18}
                  height={18}
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>

                  <p
                    className="small-regular text-light400_light500 mt-0.5
                   line-clamp-1"
                  >
                    <span className="max-sm:hidden">・</span>
                    answered {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>

              <div className="flex justify-end">
                <Votes
                  itemType="answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={userId}
                  upvoted={answer.upvoted.length}
                  hasUpVoted={answer.upvoted.includes(userId)}
                  downvoted={answer.downvoted.length}
                  hasDownVoted={answer.downvoted.includes(userId)}
                />
              </div>
            </div>

            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>

      <div className="mt-10 w-full">
        <p>TODO: Pagination</p>
      </div>
    </div>
  );
};

export default AllAnswers;

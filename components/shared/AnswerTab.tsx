import AnswerCard from "../cards/AnswerCard";
import { getUserAnswers } from "@/lib/actions/user.action";

interface Props {
  userId: string;
  clerkId: string | null;
}

const AnswerTab = async ({ userId, clerkId }: Props) => {
  const result = await getUserAnswers({ userId });

  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  );
};

export default AnswerTab;

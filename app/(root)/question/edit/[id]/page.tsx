import { auth } from "@clerk/nextjs";

import Question from "@/components/form/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";

interface Props {
  params: {
    id: string;
  };
}

const Page = async ({ params }: Props) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-10">
        <Question type="edit" mongoUserId={mongoUser._id} questionDetails={JSON.stringify(result)} />
      </div>
    </>
  );
};

export default Page;

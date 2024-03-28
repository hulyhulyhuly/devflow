import { getQuestionById } from "@/lib/actions/question.action";

const page = async ({ params }: { params: { id: string } }) => {
  const question = await getQuestionById({ questionId: params.id });

  return (
    <div>
      <h1 className="h1-bold">{question.title}</h1>

      <p>{question.content}</p>
    </div>
  );
};

export default page;

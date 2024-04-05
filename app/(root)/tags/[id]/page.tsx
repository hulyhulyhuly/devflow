import QuestionCard from "@/components/cards/QuestionCard";
import NotResult from "@/components/shared/NotResult";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    q: string;
  };
}

const page = async ({ params: { id } }: Props) => {
  const result = await getQuestionsByTagId({
    tagId: id,
    page: 1,
  });

  return (
    <>
      <h3 className="h3-bold">{result.tagName}</h3>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NotResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default page;

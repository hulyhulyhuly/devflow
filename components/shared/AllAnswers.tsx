import { getAnswers } from "@/lib/actions/answer.action";
import ParseHTML from "./ParseHTML";
import Image from "next/image";

interface Props {
  questionId: string;
}

const AllAnswers = async ({ questionId }: Props) => {
  const id = JSON.parse(questionId);
  const result = await getAnswers({ questionId: id });
  console.log(result);

  return (
    <div className="mt-10 flex w-full flex-col justify-center gap-10">
      {result.answers.map((answer) => (
        <div key={answer._id} className="flex w-full flex-col py-4 ">
          <div className="flex w-full">
            <Image
              src={answer.author.picture}
              alt="author picture"
              width={22}
              height={22}
              className="rounded-full object-contain"
            />
            <p>{answer.author.name}</p>
          </div>
          <ParseHTML data={answer.content} />
        </div>
      ))}
    </div>
  );
};

export default AllAnswers;

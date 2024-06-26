"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const route = useRouter();

  const handleEdit = () => route.push(`/question/edit/${JSON.parse(itemId)}`);

  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
    } else if (type === "answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
    }
  };

  return (
    <div className="flex justify-end items-center gap-4 max-sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="object-contain cursor-pointer"
          onClick={handleEdit}
        />
      )}

      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="object-contain cursor-pointer"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;

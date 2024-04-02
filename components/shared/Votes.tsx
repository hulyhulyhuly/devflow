"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { updateAnswerVote } from "@/lib/actions/answer.action";
import { updateQuestionVote } from "@/lib/actions/question.action";
import type {
  UpdateAnswerVoteParams,
  UpdateQuestionVoteParams,
} from "@/lib/actions/shared.types";

interface Props {
  itemType: string;
  itemId: string;
  userId: string;
  upvoted: number;
  hasUpVoted: boolean;
  downvoted: number;
  hasDownVoted: boolean;
}

enum Vote {
  up = "upvoted",
  down = "downvoted",
}

enum ItemType {
  question = "question",
  answer = "answer",
}

enum ItemIdType {
  question = "questionId",
  answer = "answerId",
}

const Votes = ({
  itemType,
  itemId,
  userId,
  upvoted,
  hasUpVoted,
  downvoted,
  hasDownVoted,
}: Props) => {
  const pathname = usePathname();

  const handleVote = async (voteType: Vote) => {
    let updateFn: (
      params: Partial<UpdateQuestionVoteParams | UpdateAnswerVoteParams>
    ) => Promise<void>;
    if (itemType === ItemType.question) {
      updateFn = updateQuestionVote as (
        params: Partial<Required<UpdateQuestionVoteParams>>
      ) => Promise<void>;
    } else if (itemType === ItemType.answer) {
      updateFn = updateAnswerVote as (
        params: Partial<Required<UpdateAnswerVoteParams>>
      ) => Promise<void>;
    } else {
      throw new Error(`except 'question' or 'answer', but get '${itemType}'`);
    }

    const itemIdField = ItemIdType[itemType as ItemType];

    let voteActions: {
      voteType: "upvoted" | "downvoted";
      action: "push" | "pull";
    }[];
    if (
      (hasUpVoted && voteType === Vote.up) ||
      (hasDownVoted && voteType === Vote.down)
    ) {
      voteActions = [{ voteType, action: "pull" }];
    } else if (
      (hasUpVoted && voteType === Vote.down) ||
      (hasDownVoted && voteType === Vote.up)
    ) {
      const voted = hasUpVoted ? Vote.up : Vote.down;
      voteActions = [
        { voteType: voted, action: "pull" },
        { voteType, action: "push" },
      ];
    } else {
      voteActions = [{ voteType, action: "push" }];
    }

    await updateFn!({
      [itemIdField]: JSON.parse(itemId),
      userId: JSON.parse(userId),
      voteActions,
      path: pathname,
    });
  };

  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex items-center justify-between ">
        <Image
          src={`/assets/icons/${hasUpVoted ? "upvoted" : "upvote"}.svg`}
          alt="upvote"
          width={20}
          height={20}
          className="cursor-pointer object-contain"
          onClick={async () => handleVote(Vote.up)}
        />
        <p className="rounded-md bg-gray-300 p-1">{upvoted}</p>
      </div>

      <div className="flex items-center justify-between">
        <Image
          src={`/assets/icons/${hasDownVoted ? "downvoted" : "downvote"}.svg`}
          alt="downvote"
          width={20}
          height={20}
          className="cursor-pointer object-contain"
          onClick={async () => handleVote(Vote.down)}
        />
        <p className="rounded-md bg-gray-300 p-1">{downvoted}</p>
      </div>
    </div>
  );
};

export default Votes;

"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { updateAnswerVote } from "@/lib/actions/answer.action";
import { updateQuestionVote } from "@/lib/actions/question.action";
import type {
  UpdateAnswerVoteParams,
  UpdateQuestionVoteParams,
} from "@/lib/actions/shared.types";
import { formatAndDivideNumber } from "@/lib/utils";
import { updateSaveQuestion } from "@/lib/actions/user.action";

interface Props {
  itemType: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpVoted: boolean;
  downvotes: number;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

enum Vote {
  up = "upvotes",
  down = "downvotes",
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
  upvotes,
  hasUpVoted,
  downvotes,
  hasDownVoted,
  hasSaved,
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
      voteType: "upvotes" | "downvotes";
      action: "$push" | "$pull";
    }[];
    if (
      (hasUpVoted && voteType === Vote.up) ||
      (hasDownVoted && voteType === Vote.down)
    ) {
      voteActions = [{ voteType, action: "$pull" }];
    } else if (
      (hasUpVoted && voteType === Vote.down) ||
      (hasDownVoted && voteType === Vote.up)
    ) {
      const voted = hasUpVoted ? Vote.up : Vote.down;
      voteActions = [
        { voteType: voted, action: "$pull" },
        { voteType, action: "$push" },
      ];
    } else {
      voteActions = [{ voteType, action: "$push" }];
    }

    await updateFn!({
      [itemIdField]: JSON.parse(itemId),
      userId: JSON.parse(userId),
      voteActions,
      path: pathname,
    });
  };

  const handleSave = async () => {
    const action = hasSaved ? "$pull" : "$push";
    await updateSaveQuestion({
      userId: JSON.parse(userId),
      action,
      questionId: JSON.parse(itemId),
      path: pathname,
    });
  };

  return (
    <div className="flex gap-2">
      {/* UpVotes / DownVotes */}
      <div className="flex-center gap-1">
        {/* UpVotes */}
        <div className="flex-center gap-1">
          <Image
            src={`/assets/icons/${hasUpVoted ? "upvoted" : "upvote"}.svg`}
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote(Vote.up)}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>

        {/* DownVotes */}
        <div className="flex-center gap-1">
          <Image
            src={`/assets/icons/${hasDownVoted ? "downvoted" : "downvote"}.svg`}
            alt="downvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote(Vote.down)}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {/* Saved (only for Quesiton now) */}
      {itemType === ItemType.question && (
        <Image
          src={`/assets/icons/${hasSaved ? "star-filled" : "star-red"}.svg`}
          alt="save question"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => handleSave()}
        />
      )}
    </div>
  );
};

export default Votes;

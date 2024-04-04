"use client";

import { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { updateAnswerVote } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { updateQuestionVote } from "@/lib/actions/question.action";
import { updateSaveQuestion } from "@/lib/actions/user.action";
import type { UpdateAnswerVoteParams, UpdateQuestionVoteParams } from "@/lib/actions/shared.types";
import { formatAndDivideNumber } from "@/lib/utils";
import { ItemIdType, ItemType, Vote } from "@/types/votes";

interface Props {
  itemType: string;
  itemId: string;
  userId: string | undefined;
  upvotes: number;
  hasUpVoted: boolean;
  downvotes: number;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({ itemType, itemId, userId, upvotes, hasUpVoted, downvotes, hasDownVoted, hasSaved }: Props) => {
  const pathname = usePathname();
  const route = useRouter();

  useEffect(() => {
    if (itemType !== ItemType.question) {
      return;
    }
    viewQuestion({
      userId: userId ? JSON.parse(userId) : undefined,
      questionId: JSON.parse(itemId),
    });
    console.log("update...");
  }, [userId, itemId, pathname, route]);

  const handleVote = async (voteType: Vote) => {
    let updateFn: (params: Partial<UpdateQuestionVoteParams | UpdateAnswerVoteParams>) => Promise<void>;
    if (itemType === ItemType.question) {
      updateFn = updateQuestionVote as (params: Partial<Required<UpdateQuestionVoteParams>>) => Promise<void>;
    } else if (itemType === ItemType.answer) {
      updateFn = updateAnswerVote as (params: Partial<Required<UpdateAnswerVoteParams>>) => Promise<void>;
    } else {
      throw new Error(`except 'question' or 'answer', but get '${itemType}'`);
    }

    const itemIdField = ItemIdType[itemType as ItemType];

    await updateFn!({
      [itemIdField]: JSON.parse(itemId),
      userId: JSON.parse(userId!),
      hasUpVoted,
      hasDownVoted,
      voteType,
      path: pathname,
    });
  };

  const handleSave = async () => {
    await updateSaveQuestion({
      userId: JSON.parse(userId!),
      questionId: JSON.parse(itemId),
      hasSaved: hasSaved as boolean,
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
            <p className="subtle-medium text-dark400_light900">{formatAndDivideNumber(upvotes)}</p>
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
            <p className="subtle-medium text-dark400_light900">{formatAndDivideNumber(downvotes)}</p>
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

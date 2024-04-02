"use client";

import Image from "next/image";

import { updateAnswerVote } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";

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

interface Props {
  itemType: string;
  itemId: string;
  userId: string;
  upvoted: number;
  hasUpVoted: boolean;
  downvoted: number;
  hasDownVoted: boolean;
}

const Votes = async ({
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
    /**
     * TODO
     *
     * 1. before update, need to check whether user already voted 'up' / 'down'
     *    1-1. if not yet, go to 3.
     *    1-2. if done,
     *                  voteType: 'up',   voted: 'up'   ---
     *         1-2-1 --<                                  |--> remove user from its voteType
     *                  voteType: 'down', voted: 'down' ---
     *
     *                  voteType: 'up',   voted: 'down' ---
     *         1-2-2 --<                                  |--> remove user from its voted, append user to its voteType
     *                  voteType: 'down', voted: 'up'   ---
     * 2. append user to its voteType
     *
     */

    let updateFn: Function;
    switch (itemType) {
      case ItemType.question:
        // updateFn = updateQuestionVote;
        return updateAnswerVote;
      case ItemType.answer:
        return updateAnswerVote;
      default:
        throw new Error(`except 'question' or 'answer', but get '${itemType}'`);
    }

    const itemIdField = ItemIdType[itemType as ItemType];

    const voteActions = [];
    if (
      (hasUpVoted && voteType === Vote.up) ||
      (hasDownVoted && voteType === Vote.down)
    ) {
      action.push({
        voteType,
        action: "pull",
      });
    } else if (
      (hasUpVoted && voteType === Vote.down) ||
      (hasDownVoted && voteType === Vote.up)
    ) {
      const voted = hasUpVoted ? Vote.down : Vote.up;

      action.push({
        voteType: voted,
        action: "pull",
      });

      voteActions.push({
        voteType,
        action: "push",
      });
    } else {
      voteActions.push({
        voteType,
        action: "push",
      });
    }

    try {
      await updateFn!({
        [itemIdField]: JSON.parse(itemId),
        userId: JSON.parse(userId),
        voteActions,
        path: pathname,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex items-center justify-between ">
        <Image
          src="/assets/icons/upvote.svg"
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
          src="/assets/icons/downvote.svg"
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

"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongoose";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { Action } from "@/types/actions";
import { Vote, VoteAction } from "@/types/votes";
import type { CreateAnswerParams, GetAnswersParams, UpdateAnswerVoteParams } from "./shared.types";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase();

    const { author, content, question, path } = params;

    const newAnswer = await Answer.create({ author, content, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    await connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        select: "_id clerkId name picture",
      })
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateAnswerVote(params: UpdateAnswerVoteParams) {
  try {
    await connectToDatabase();

    const { answerId, userId, hasUpVoted, hasDownVoted, voteType, path } = params;

    let voteActions: VoteAction[];
    if ((hasUpVoted && voteType === Vote.up) || (hasDownVoted && voteType === Vote.down)) {
      voteActions = [{ voteType, action: Action.pull }];
    } else if ((hasUpVoted && voteType === Vote.down) || (hasDownVoted && voteType === Vote.up)) {
      const voted = hasUpVoted ? Vote.up : Vote.down;
      voteActions = [
        { voteType: voted, action: Action.pull },
        { voteType, action: Action.push },
      ];
    } else {
      voteActions = [{ voteType, action: Action.push }];
    }

    for (const { action, voteType } of voteActions) {
      await Answer.findByIdAndUpdate(answerId, {
        [action]: { [voteType]: userId },
      });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongoose";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import type {
  CreateAnswerParams,
  GetAnswersParams,
  UpdateAnswerVoteParams,
} from "@/lib/actions/shared.types";
import path from "path";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

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
    connectToDatabase();

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
  type VA = {
    action: "$push" | "$pull";
    voteType: "upvotes" | "downvotes";
  };

  try {
    connectToDatabase();

    const { answerId, userId, voteActions, path } = params;

    for (const { action, voteType } of voteActions as VA[]) {
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

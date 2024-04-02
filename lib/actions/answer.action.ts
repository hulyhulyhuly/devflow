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
  try {
    connectToDatabase();

    const { answerId, userId, voteActions, path } = params;

    type VA = { voteType: string; action: string };

    const updateVote = async ({ voteType, action }: VA) => {
      const updateQuery =
        action === "push"
          ? { $push: { [voteType]: userId } }
          : { $pull: { [voteType]: userId } };
      await Answer.findByIdAndUpdate(answerId, updateQuery);
    };

    for (const voteaction of voteActions) {
      await updateVote(voteaction);
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

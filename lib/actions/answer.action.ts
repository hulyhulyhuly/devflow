"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongoose";

import Answer from "../../database/answer.model";
import Question from "../../database/question.model";
import type { CreateAnswerParams } from "@/lib/actions/shared.types";

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

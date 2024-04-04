"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { Action } from "@/types/actions";
import { Vote, VoteAction } from "@/types/votes";
import type {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  UpdateQuestionVoteParams,
} from "./shared.types";

export async function getQuestions(parmas: GetQuestionsParams) {
  try {
    await connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase();

    const { title, content, tags, author, path } = params;

    // 01. Create the question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // 02. Create the tags ot get them if they already exist.
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`${tag}`, "i") } },
        {
          $setOnInsert: { name: tag },
          $push: { question: question._id },
        },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // 03. Create an interaction record for the user's ask_question action

    // 04. Increment author's reputation by +5 for creating a question

    revalidatePath(path);
  } catch (error) {}
}

export async function updateQuestionVote(params: UpdateQuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasUpVoted, hasDownVoted, voteType, path } = params;

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
      await Question.findByIdAndUpdate(questionId, {
        [action]: { [voteType]: userId },
      });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

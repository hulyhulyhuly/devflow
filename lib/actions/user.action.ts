"use server";

import { FilterQuery } from "mongoose";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import type {
  CreateUserParams,
  DeleteUserParams,
  GetAllUserParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  UpdateSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { Action } from "@/types/actions";

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUserParams) {
  try {
    connectToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 });

    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    const user = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIDs = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // delete user questions.
    await Question.deleteMany({ author: user._id });

    // TODO: delete user comments, votes, etc.

    const deleteUser = await User.findByIdAndDelete(user._id);

    return deleteUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery ? { title: { $regex: new RegExp(searchQuery, "i") } } : {};

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const savedQuestions = user.saved;

    return { questions: savedQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateSaveQuestion(params: UpdateSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, hasSaved, questionId, path } = params;

    const action = hasSaved ? Action.pull : Action.push;
    await User.findByIdAndUpdate(userId, { [action]: { saved: questionId } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

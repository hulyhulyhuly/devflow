"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

import Question from "@/database/question.model";
import User from "@/database/user.model";

import type {
  CreateUserParams,
  DeleteUserParams,
  GetAllUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";

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

    const users = await User.find({});

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

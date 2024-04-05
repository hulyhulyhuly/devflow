"use server";

import { connectToDatabase } from "../mongoose";

import User from "@/database/user.model";
import Tag, { ITag } from "@/database/tag.model";
import type { GetAllTagsParams, GetTagByIdParams, GetTopInteractedTagsParams } from "./shared.types";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();

    // const { userId, limit = 3 } = params;
    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // TODO: Find Interactions for the use and group by tags

    // mock tags
    return [
      { _id: "1", name: "YO" },
      { _id: "2", name: "ABC" },
      { _id: "3", name: "123" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetTagByIdParams) {
  try {
    await connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery ? { title: { $regex: searchQuery, $options: "i" } } : {},
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    return {
      tagName: tag.name,
      questions: tag.questions,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();

    const tags = await Tag.find({}).sort({ createAt: -1 });

    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

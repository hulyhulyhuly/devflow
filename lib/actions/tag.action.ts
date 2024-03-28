"use server";

import { connectToDatabase } from "../mongoose";

import User from "@/database/user.model";
import type { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

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

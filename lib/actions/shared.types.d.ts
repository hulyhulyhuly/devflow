import { Schema } from "mongoose";

import type { IUser } from "@/database/user.model";

/* Question */

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searhQuery?: string;
  filter?: string;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

/* User */
export interface GetUserByIdParams {
  userId: string;
}

export interface GetAllUserParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetUserStatsParams {
  userId: string;
  page?: string;
  pageSize?: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
}

export interface DeleteUserParams {
  clerkId: string;
}

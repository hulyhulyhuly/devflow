import { Schema } from "mongoose";

import type { IUser } from "@/database/user.model";
import type { ItemIdType, Vote, VoteAction } from "@/types/votes";

/* Question */
export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searhQuery?: string;
  filter?: string;
}

export interface GetQuestionByIdParams {
  questionId: string;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface UpdateQuestionVoteParams {
  questionId: ItemIdType.question;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  voteType: Vote;
  path: string;
}

export interface EditQuestionParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}

export interface DeleteQuestionParams {
  questionId: string;
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
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface UpdateSaveQuestionParams {
  userId: string;
  hasSaved: boolean;
  questionId: string;
  path: string;
}

/* Tags */
export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

export interface GetTagByIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

/* Answer */
export interface CreateAnswerParams {
  author: string;
  question: string;
  content: string;
  path: string;
}

export interface GetAnswersParams {
  questionId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface UpdateAnswerVoteParams {
  answerId: ItemIdType.answer;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  voteType: Vote;
  path: string;
}

export interface DeleteAnswerParams {
  answerId: string;
  path: string;
}

/* Interaction */
export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

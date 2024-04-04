import { Action } from "./actions";

export enum Vote {
  up = "upvotes",
  down = "downvotes",
}

export enum ItemType {
  question = "question",
  answer = "answer",
}

export enum ItemIdType {
  question = "questionId",
  answer = "answerId",
}

export type VoteAction = {
  action: Action.push | Action.pull;
  voteType: Vote;
};

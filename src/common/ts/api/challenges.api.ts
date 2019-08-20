import { get, post } from "common/api/index";
import { Challenge } from "common/types";

export const getChallenges = async function(
  userId: number
): Promise<Challenge[]> {
  return get("/api/app/users/" + userId + "/challenges").then(
    async response => {
      if (!response.ok) {
        alert("Failed to get challenges");
      }
      return response.json();
    }
  );
};

export enum SubmissionStatus {
  INCORRECT = 0,
  CORRECT = 1,
  ALREADY_SOLVED = 2
}

export interface Submission {
  status: SubmissionStatus;
  challenge: Challenge;
}

export const submitFlag = async function(
  userId: number,
  challengeId: number,
  flag: string
): Promise<Submission> {
  return post("/api/app/users/" + userId + "/challenges/" + challengeId, {
    flag: flag
  }).then(async response => {
    if (!response.ok) {
      alert("Failed to submit flag");
    }
    return response.json();
  });
};

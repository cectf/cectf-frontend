import { Challenge } from "types";

var challenge: Challenge = {
  id: 1,
  title: "First",
  category: "crypto",
  body: "Do it",
  hint: "hint",
  solution: "CTF{flag}",
  hinted: false,
  solved: true
};

export const getChallenges = async function(
  userId: number
): Promise<Challenge[]> {
  return new Promise<Challenge[]>((resolve, reject) => {
    if (userId == 1) {
      resolve([challenge]);
    } else {
      reject("userId not found");
    }
  });
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
  return new Promise<Submission>((resolve, reject) => {
    if (userId == 1 && challengeId == 1 && flag == challenge.solution) {
      resolve({ status: SubmissionStatus.CORRECT, challenge: challenge });
    } else {
      reject();
    }
  });
};

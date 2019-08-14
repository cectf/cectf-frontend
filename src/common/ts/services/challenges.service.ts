import { get, post } from "common/services/api.service.ts";

export interface Challenge {
  id: number;
  title: string;
  category: string;
  body: string;
}

export const getChallenges = async function(
  userId: number
): Promise<Challenge[]> {
  return get("/api/app/users/" + userId + "/challenges").then(challenges => {
    console.log(challenges);
    return challenges;
  });
};

export const submitFlag = async function(
  userId: number,
  challengeId: number,
  flag: string
): Promise<Challenge> {
  return post("/api/app/users/" + userId + "/challenge/" + challengeId, {
    flag: flag
  });
};

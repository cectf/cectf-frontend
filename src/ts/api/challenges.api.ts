import api from "api/api";
import { Challenge, Submission } from "types";

const getChallenges = async function(): Promise<Challenge[]> {
  return api.get("/api/challenges").then(async response => {
    if (response.status != 200) {
      return [];
    }
    return response.json();
  });
};

const submitFlag = async function(
  challengeId: number,
  flag: string
): Promise<Submission> {
  return api
    .post("/api/challenges/" + challengeId, {
      flag: flag
    })
    .then(async response => {
      return response.json();
    });
};

export default {
  getChallenges,
  submitFlag
};

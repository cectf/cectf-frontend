import api from "api/api";
import { Challenge, Submission } from "types";

const getChallenges = async function(): Promise<Challenge[]> {
  return api.get("/api/challenge").then(async response => {
    if (!response.ok) {
      alert("Failed to get challenges");
    }
    return response.json();
  });
};

const submitFlag = async function(
  challengeId: number,
  flag: string
): Promise<Submission> {
  return api
    .post("/api/challenge/" + challengeId, {
      flag: flag
    })
    .then(async response => {
      if (!response.ok) {
        alert("Failed to submit flag");
      }
      return response.json();
    });
};

export default {
  getChallenges,
  submitFlag
};

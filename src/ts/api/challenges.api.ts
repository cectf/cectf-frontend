import api from "@cectf/api/api";
import { Challenge, Submission } from "@cectf/types";

/**
 * Gets the current available CTF challenges
 */
const getChallenges = async function(): Promise<Challenge[]> {
  return api.get("/api/ctf/challenges").then(async response => {
    if (response.status != 200) {
      return [];
    }
    return response.json();
  });
};

/**
 * Attempts to submit a flag for a challenge
 * 
 * @param challengeId the id of the challenge
 * @param flag the flag to submit
 */
const submitFlag = async function(
  challengeId: number,
  flag: string
): Promise<Submission> {
  return api
    .post("/api/ctf/challenges/" + challengeId, {
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

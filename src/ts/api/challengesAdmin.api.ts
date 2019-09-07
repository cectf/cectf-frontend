import api from "api/api";
import { Challenge } from "types";

const getChallenges = async function(): Promise<Challenge[]> {
  return api.get("/api/admin/challenges").then(async response => {
    console.log("AYY I HAVE GOT DEM ADMIN CHALLENGES");
    console.log(response);
    console.log(response.status);
    if (response.status != 200) {
      return [];
    }
    return response.json();
  });
};

const createChallenge = async function(
  challenge: Challenge
): Promise<Challenge> {
  return api.post("/api/admin/challenges", challenge).then(async response => {
    return response.json();
  });
};

const updateChallenge = async function(
  challengeId: number,
  challenge: Challenge
): Promise<Challenge> {
  return api
    .post("/api/admin/challenges/" + challengeId, challenge)
    .then(async response => {
      return response.json();
    });
};

export default {
  getChallenges,
  createChallenge,
  updateChallenge
};

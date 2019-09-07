import api from "api/api";
import { ChallengeStub } from "types";

const getChallenges = async function(): Promise<ChallengeStub[]> {
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
  challenge: ChallengeStub
): Promise<ChallengeStub> {
  return api.post("/api/admin/challenges", challenge).then(async response => {
    return response.json();
  });
};

const updateChallenge = async function(
  challengeId: number,
  challenge: ChallengeStub
): Promise<ChallengeStub> {
  return api
    .post("/api/admin/challenges/" + challengeId, challenge)
    .then(async response => {
      return response.json();
    });
};

const deleteChallenge = async function(challengeId: number): Promise<void> {
  return api.deleteHttp("/api/admin/challenges/" + challengeId).then(() => {
    return;
  });
};

export default {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge
};

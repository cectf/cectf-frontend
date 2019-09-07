import api from "api";
import state from "state";
import { Challenge } from "types";

const updateChallenges = async function() {
  console.log("CALLING DAT ADMIN");
  api.challengesAdmin.getChallenges().then(challenges => {
    console.log("DEM CHALLENGES");
    console.log(challenges);
    state.admin.challenges.nextState(challenges);
  });
};

const createChallenge = async function(
  challenge: Challenge
): Promise<Challenge> {
  return api.challengesAdmin.createChallenge(challenge).then(challenge => {
    state.admin.challenges.setChallenge(challenge);
    return challenge;
  });
};

const updateChallenge = async function(
  challengeId: number,
  challenge: Challenge
): Promise<Challenge> {
  return api.challengesAdmin
    .updateChallenge(challengeId, challenge)
    .then(challenge => {
      state.admin.challenges.setChallenge(challenge);
      return challenge;
    });
};

const reset = async function() {
  state.challenges.nextState([]);
};

export default { updateChallenges, createChallenge, updateChallenge, reset };

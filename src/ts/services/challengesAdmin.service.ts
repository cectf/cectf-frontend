import api from "api";
import state from "state";
import { ChallengeStub } from "types";

const updateChallenges = async function() {
  api.challengesAdmin.getChallenges().then(challenges => {
    state.admin.challenges.nextState(challenges);
  });
};

const createChallenge = async function(
  challenge: ChallengeStub
): Promise<ChallengeStub> {
  return api.challengesAdmin.createChallenge(challenge).then(challenge => {
    state.admin.challenges.setChallenge(challenge);
    return challenge;
  });
};

const updateChallenge = async function(
  challengeId: number,
  challenge: ChallengeStub
): Promise<ChallengeStub> {
  return api.challengesAdmin
    .updateChallenge(challengeId, challenge)
    .then(challenge => {
      state.admin.challenges.setChallenge(challenge);
      return challenge;
    });
};

const deleteChallenge = async function(
  challenge: ChallengeStub
): Promise<void> {
  if (challenge.id) {
    return api.challengesAdmin.deleteChallenge(challenge.id).then(() => {
      state.admin.challenges.deleteChallenge(challenge);
    });
  }
  return;
};

const reset = async function() {
  state.challenges.nextState([]);
};

export default {
  updateChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  reset
};

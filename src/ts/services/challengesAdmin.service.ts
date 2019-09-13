import api from "api";
import state from "state";
import { AdminChallenge, NewAdminChallenge } from "types";

const updateChallenges = async function() {
  api.challengesAdmin.getChallenges().then(challenges => {
    state.admin.challenges.nextState(challenges);
  });
};

const createChallenge = async function(
  challenge: NewAdminChallenge
): Promise<AdminChallenge> {
  return api.challengesAdmin.createChallenge(challenge).then(challenge => {
    state.admin.challenges.setChallenge(challenge);
    return challenge;
  });
};

const updateChallenge = async function(
  challengeId: number,
  challenge: AdminChallenge | NewAdminChallenge
): Promise<AdminChallenge> {
  return api.challengesAdmin
    .updateChallenge(challengeId, challenge)
    .then(challenge => {
      state.admin.challenges.setChallenge(challenge);
      return challenge;
    });
};

const deleteChallenge = async function(
  challenge: AdminChallenge
): Promise<void> {
  return api.challengesAdmin.deleteChallenge(challenge.id).then(() => {
    state.admin.challenges.deleteChallenge(challenge);
  });
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

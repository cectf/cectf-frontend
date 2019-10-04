import api from "api";
import { store, adminSetChallenges, adminAddChallenge, adminUpdateChallenge, adminDeleteChallenge } from "state";
import { AdminChallenge, NewAdminChallenge } from "types";

const updateChallenges = async function () {
  api.challengesAdmin.getChallenges()
    .then(challenges => {
      store.dispatch(adminSetChallenges(challenges));
    });
};

const createChallenge = async function (
  challenge: NewAdminChallenge
): Promise<AdminChallenge> {
  return api.challengesAdmin.createChallenge(challenge)
    .then(challenge => {
      store.dispatch(adminAddChallenge(challenge));
      return challenge;
    });
};

const updateChallenge = async function (
  challengeId: number,
  challenge: AdminChallenge | NewAdminChallenge
): Promise<AdminChallenge> {
  return api.challengesAdmin
    .updateChallenge(challengeId, challenge)
    .then(challenge => {
      store.dispatch(adminUpdateChallenge(challenge));
      return challenge;
    });
};

const deleteChallenge = async function (
  challenge: AdminChallenge
): Promise<void> {
  return api.challengesAdmin.deleteChallenge(challenge.id)
    .then(() => {
      store.dispatch(adminDeleteChallenge(challenge));
    });
};

export default {
  updateChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge
};

import * as log from 'loglevel';
import api from "@cectf/api";
import { store, adminSetChallenges, adminAddChallenge, adminUpdateChallenge, adminDeleteChallenge } from "@cectf/state";
import { AdminChallenge, NewAdminChallenge } from "@cectf/types";

const updateChallenges = async function () {
  log.info("Updating admin challenges");
  api.challengesAdmin.getChallenges()
    .then(challenges => {
      store.dispatch(adminSetChallenges(challenges));
    });
};

const createChallenge = async function (
  challenge: NewAdminChallenge
): Promise<AdminChallenge> {
  log.info("Creating new challenge \"{}\"", challenge.title);
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
  log.info("Updating challenge {}", challengeId);
  return api.challengesAdmin.updateChallenge(challengeId, challenge)
    .then(challenge => {
      store.dispatch(adminUpdateChallenge(challenge));
      return challenge;
    });
};

const deleteChallenge = async function (
  challenge: AdminChallenge
): Promise<void> {
  log.info("Deleting challenge {}", challenge.id);
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

import * as log from 'loglevel';
import api from "@cectf/api";
import { store, adminSetChallenges, adminAddChallenge, adminUpdateChallenge, adminDeleteChallenge } from "@cectf/state";
import { AdminChallenge, NewAdminChallenge } from "@cectf/types";

/**
 * Updates the list of challenges in redux for display in the admin view.
 */
const updateChallenges = async function () {
  log.info("Updating admin challenges");
  api.challengesAdmin.getChallenges()
    .then(challenges => {
      store.dispatch(adminSetChallenges(challenges));
    });
};

/**
 * Creates a new challenge.
 * 
 * @param challenge the challenge to create
 */
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

/**
 * Updates a challenge.
 * 
 * @param challengeId the ID of the challenge to update
 * @param challenge the new challenge data
 */
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

/**
 * Deletes a challenge.
 * 
 * @param challenge the challenge to delete
 */
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

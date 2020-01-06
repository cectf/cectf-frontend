import api from "@cectf/api/api";
import { AdminChallenge, NewAdminChallenge } from "@cectf/types";

/**
 * Gets all data for all challenges for rendering in the admin view
 */
const getChallenges = async function (): Promise<AdminChallenge[]> {
  return api
    .get("/api/admin/challenges")
    .then(async response => {
      if (response.status != 200) {
        return [];
      }
      return response.json();
    });
};

/**
 * Creates a new challenge
 * 
 * @param challenge the challenge to create
 */
const createChallenge = async function (
  challenge: NewAdminChallenge
): Promise<AdminChallenge> {
  return api
    .post("/api/admin/challenges", challenge)
    .then(async response => {
      return response.json();
    });
};

/**
 * Updates a challenge
 * 
 * @param challengeId the ID of the challenge to update
 * @param challenge the new challenge information
 */
const updateChallenge = async function (
  challengeId: number,
  challenge: AdminChallenge | NewAdminChallenge
): Promise<AdminChallenge> {
  return api
    .post("/api/admin/challenges/" + challengeId, challenge)
    .then(async response => {
      return response.json();
    });
};

/**
 * Deletes a challenge
 * 
 * @param challengeId the ID of the challenge to delete
 */
const deleteChallenge = async function (challengeId: number): Promise<void> {
  return api
    .deleteHttp("/api/admin/challenges/" + challengeId)
    .then(() => {
      return;
    });
};

export default {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge
};

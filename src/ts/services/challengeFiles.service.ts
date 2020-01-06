import * as log from 'loglevel';
import api from "@cectf/api";
import { store, setChallengeFiles } from "@cectf/state";
import { AdminChallenge, Challenge, FileDescriptor } from "@cectf/types";

/**
 * Updates the list of challenge files in redux for a specific challenge.
 * 
 * @param challenge the challenge to update the files for
 */
const updateChallengeFiles = async function (challenge: Challenge | AdminChallenge) {
  log.info("Updating challenge files for challenge {}", challenge.id);
  return api.challengeFiles.getFiles(challenge.id)
    .then(files => {
      store.dispatch(setChallengeFiles(challenge.id, files));
    });
};

/**
 * Uploads a new challenge file for a challenge.
 * This operation will only succeed for admin users.
 * `updateChallengeFiles` will be called after successfully updating.
 * 
 * @param challenge the challenge to upload a file to
 * @param file the file to upload
 */
const uploadChallengeFile = async function (challenge: Challenge | AdminChallenge, file: File) {
  log.info("Adding file {} to challenge {}", file.name, challenge.id);
  return api.challengeFiles.uploadFile(challenge.id, file)
    .then(() => updateChallengeFiles(challenge));
};

/**
 * Deletes a challenge file from a challenge.
 * This operation will only succeed for admin users.
 * `updateChallengeFiles` will be called after successfully deleting.
 * 
 * @param challenge the challenge to delete a file from
 * @param file the file to delete
 */
const deleteChallengeFile = async function (challenge: Challenge | AdminChallenge, file: FileDescriptor) {
  log.info("Deleting file {} from challenge {}", file.name, challenge.id);
  return api.challengeFiles.deleteFile(challenge.id, file)
    .then(() => updateChallengeFiles(challenge));
};

export default {
  updateChallengeFiles,
  uploadChallengeFile,
  deleteChallengeFile
};

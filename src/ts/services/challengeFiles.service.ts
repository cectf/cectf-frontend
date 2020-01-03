import * as log from 'loglevel';
import api from "@cectf/api";
import { store, setChallengeFiles } from "@cectf/state";
import { AdminChallenge, Challenge, FileDescriptor } from "@cectf/types";

const updateChallengeFiles = async function (challenge: Challenge | AdminChallenge) {
  log.info("Updating challenge files for challenge {}", challenge.id);
  return api.challengeFiles.getFiles(challenge.id)
    .then(files => {
      store.dispatch(setChallengeFiles(challenge.id, files));
    });
};

const uploadChallengeFile = async function (challenge: Challenge | AdminChallenge, file: File) {
  log.info("Adding file {} to challenge {}", file.name, challenge.id);
  return api.challengeFiles.uploadFile(challenge.id, file)
    .then(() => updateChallengeFiles(challenge));
};

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

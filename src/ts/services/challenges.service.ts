import * as log from 'loglevel';
import api from "@cectf/api";
import { store, ctfSetChallenges, ctfUpdateChallenge } from "@cectf/state";
import { SubmissionStatus } from "@cectf/types";

const updateChallenges = async function () {
  log.info("Updating challenges");
  api.challenges.getChallenges().then(challenges => {
    store.dispatch(ctfSetChallenges(challenges));
  });
};

const submitFlag = async function (
  challengeId: number,
  flag: string
  // TODO make this return void and store SubmissionStatus in a messaging state
): Promise<SubmissionStatus> {
  log.info("Submitting flag %s for challenge %s", flag, challengeId);
  return api.challenges.submitFlag(challengeId, flag).then(submission => {
    if (submission.status == SubmissionStatus.CORRECT && submission.challenge) {
      log.debug("Flag was correct!");
      updateChallenges();
    }
    return submission.status;
  });
};

export default { updateChallenges, submitFlag };

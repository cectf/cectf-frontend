import api from "@cectf/api";
import { store, ctfSetChallenges, ctfUpdateChallenge } from "@cectf/state";
import { SubmissionStatus } from "@cectf/types";

const updateChallenges = async function () {
  api.challenges.getChallenges().then(challenges => {
    store.dispatch(ctfSetChallenges(challenges));
  });
};

const submitFlag = async function (
  challengeId: number,
  flag: string
  // TODO make this return void and store SubmissionStatus in a messaging state
): Promise<SubmissionStatus> {
  return api.challenges.submitFlag(challengeId, flag).then(submission => {
    if (submission.status == SubmissionStatus.CORRECT && submission.challenge) {
      store.dispatch(ctfUpdateChallenge(submission.challenge));
    }
    return submission.status;
  });
};

export default { updateChallenges, submitFlag };

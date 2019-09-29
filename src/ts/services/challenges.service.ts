import api from "api";
import { store } from "state";
import { SubmissionStatus } from "types";
import { setChallenges, updateChallenge } from "state/actions";

const updateChallenges = async function () {
  api.challenges.getChallenges().then(challenges => {
    store.dispatch(setChallenges(challenges));
  });
};

const submitFlag = async function (
  challengeId: number,
  flag: string
  // TODO make this return void and store SubmissionStatus in a messaging state
): Promise<SubmissionStatus> {
  return api.challenges.submitFlag(challengeId, flag).then(submission => {
    if (submission.status == SubmissionStatus.CORRECT && submission.challenge) {
      store.dispatch(updateChallenge(submission.challenge));
    }
    return submission.status;
  });
};

export default { updateChallenges, submitFlag };

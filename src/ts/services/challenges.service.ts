import api from "api";
import state from "state";
import { SubmissionStatus } from "types";

const updateChallenges = async function() {
  api.challenges.getChallenges().then(challenges => {
    state.challenges.nextState(challenges);
  });
};

const submitFlag = async function(
  challengeId: number,
  flag: string
  // TODO make this return void and store SubmissionStatus in a messaging state
): Promise<SubmissionStatus> {
  return api.challenges.submitFlag(challengeId, flag).then(submission => {
    if (submission.status == SubmissionStatus.CORRECT) {
      state.challenges.setChallenge(submission.challenge);
    }
    return submission.status;
  });
};

const reset = async function() {
  state.challenges.nextState([]);
};

export default { updateChallenges, submitFlag, reset };

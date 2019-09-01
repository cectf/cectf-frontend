import api from "api";
import state from "state";
import { SubmissionStatus } from "types";

const updateChallenges = async function(): Promise<void> {
  return api.challenges.getChallenges().then(challenges => {
    state.challenges.setChallenges(challenges);
  });
};

const submitFlag = async function(
  challengeId: number,
  flag: string
): Promise<SubmissionStatus> {
  return api.challenges.submitFlag(challengeId, flag).then(submission => {
    console.log("Processing submission");
    console.log(submission);
    if (submission.status == SubmissionStatus.CORRECT) {
      console.log("Correct!");
      state.challenges.setChallenge(submission.challenge);
    }
    return submission.status;
  });
};

const reset = async function() {
  state.challenges.nextState([]);
};

export default { updateChallenges, submitFlag, reset };

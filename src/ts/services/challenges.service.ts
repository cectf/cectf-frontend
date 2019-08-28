import * as ChallengesApi from "api/challenges.api";
import * as State from "state";

export const getChallenges = async function(userId: number): Promise<void> {
  return ChallengesApi.getChallenges(userId).then(challenges => {
    State.challenges.setChallenges(challenges);
  });
};

export const submitFlag = async function(
  userId: number,
  challengeId: number,
  flag: string
): Promise<ChallengesApi.SubmissionStatus> {
  return ChallengesApi.submitFlag(userId, challengeId, flag).then(
    submission => {
      console.log("Processing submission");
      console.log(submission);
      if (submission.status == ChallengesApi.SubmissionStatus.CORRECT) {
        console.log("Correct!");
        State.challenges.setChallenge(submission.challenge);
      }
      return submission.status;
    }
  );
};

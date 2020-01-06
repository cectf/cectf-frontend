import * as log from 'loglevel';
import api from "@cectf/api";
import popupService from "@cectf/services/popup.service";
import { store, ctfSetChallenges, ctfUpdateChallenge } from "@cectf/state";
import { SubmissionStatus, Challenge, PopupLocation } from "@cectf/types";

/**
 * Updates the list of challenges in redux.
 */
const updateChallenges = async function () {
  log.info("Updating challenges");
  api.challenges.getChallenges()
    .then(challenges => {
      store.dispatch(ctfSetChallenges(challenges));
    });
};

/**
 * Attempts a flag submission.
 * A popup will be sent to inform the user of the success of the submission.
 * 
 * @param challengeId the ID of the challenge to submit
 * @param flag the flag to submit
 */
const submitFlag = async function (
  challengeId: number,
  flag: string
): Promise<void> {
  log.info("Submitting flag %s for challenge %s", flag, challengeId);
  return api.challenges.submitFlag(challengeId, flag)
    .then(submission => {
      if (submission.status == SubmissionStatus.CORRECT) {
        log.debug("Flag was correct!");
        popupService.info(PopupLocation.CHALLENGE_TILE, "You did it!", challengeId);
        updateChallenges();
      } else if (submission.status == SubmissionStatus.INCORRECT) {
        popupService.error(PopupLocation.CHALLENGE_TILE, "That ain't right. n00b.", challengeId);
      } else if (submission.status == SubmissionStatus.ALREADY_SOLVED) {
        popupService.info(PopupLocation.CHALLENGE_TILE, "You already solved this one!", challengeId);
      } else {
        log.error("Unknown submission status: %s", submission.status);
        popupService.error(PopupLocation.CHALLENGE_TILE, "Unknown server error :O", challengeId);
      }
    });
};

/**
 * Sets the state of the dropdown for a challenge.
 * 
 * @param challenge the challenge to update
 * @param open whether or not the dropdown should be open
 */
const setChallengeIsOpen = async function (challenge: Challenge, open: boolean) {
  log.info("Opening/closing challenge %s", challenge.id);
  store.dispatch(ctfUpdateChallenge({ data: challenge, open: open }));
}

export default { updateChallenges, submitFlag, setChallengeIsOpen };

import { Challenge, SubmissionStatus } from "types";

/*
 * action types
 */

export interface Action<T> {
    type: ActionId,
    value: T
}

export const enum ActionId {
    RESET,
    SET_CSRF,
    SET_NAV_TAB,
    ADD_CHALLENGE,
    UPDATE_CHALLENGE,
    DELETE_CHALLENGE,
    SET_USER
}

/*
 * action creators
 */

export function reset(): Action<null> {
    return {type: ActionId.RESET, value: null};
}

export function setCsrf(csrfToken: string): Action<string> {
    return { type: ActionId.SET_CSRF, value: csrfToken }
}

export function addChallenge(challenge: Challenge): Action<Challenge> {
    return { type: ActionId.ADD_CHALLENGE, value: challenge }
}

export function updateChallenge(challenge: Challenge): Action<Challenge> {
    return { type: ActionId.UPDATE_CHALLENGE, value: challenge }
}

export default { setCsrf, addChallenge, updateChallenge };
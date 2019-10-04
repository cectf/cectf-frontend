import { Challenge, AdminChallenge, User, NavPage } from "types";

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
    SET_NAV_PAGE,
    CTF_SET_CHALLENGES,
    CTF_UPDATE_CHALLENGE,
    ADMIN_SET_CHALLENGES,
    ADMIN_ADD_CHALLENGE,
    ADMIN_UPDATE_CHALLENGE,
    ADMIN_DELETE_CHALLENGE,
    SET_USER
}

/*
 * action creators
 */

export function reset(): Action<null> {
    return { type: ActionId.RESET, value: null };
}

export function setCsrf(csrfToken: string): Action<string> {
    return { type: ActionId.SET_CSRF, value: csrfToken }
}

export function setNavPage(navPage: NavPage): Action<NavPage> {
    return { type: ActionId.SET_NAV_PAGE, value: navPage }
}

export function ctfSetChallenges(challenges: Challenge[]): Action<Challenge[]> {
    return { type: ActionId.CTF_SET_CHALLENGES, value: challenges }
}

export function ctfUpdateChallenge(challenge: Challenge): Action<Challenge> {
    return { type: ActionId.CTF_UPDATE_CHALLENGE, value: challenge }
}

export function adminSetChallenges(challenges: AdminChallenge[]): Action<AdminChallenge[]> {
    return { type: ActionId.ADMIN_SET_CHALLENGES, value: challenges }
}

export function adminAddChallenge(challenge: AdminChallenge): Action<AdminChallenge> {
    return { type: ActionId.ADMIN_ADD_CHALLENGE, value: challenge }
}

export function adminUpdateChallenge(challenge: AdminChallenge): Action<AdminChallenge> {
    return { type: ActionId.ADMIN_UPDATE_CHALLENGE, value: challenge }
}

export function adminDeleteChallenge(challenge: AdminChallenge): Action<AdminChallenge> {
    return { type: ActionId.ADMIN_DELETE_CHALLENGE, value: challenge }
}

export function setUser(user: User | null): Action<User | null> {
    return { type: ActionId.SET_USER, value: user };
}
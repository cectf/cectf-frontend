import { Challenge, Config, AdminChallenge, User, NavPage, Popup, ModalID, ModalKey, FileDescriptor, ChallengeData, PopupLocation } from "@cectf/types";

/*
 * action types
 */

export interface Action<T> {
    type: ActionId,
    value: T
}

export const enum ActionId {
    UPDATE_CONFIG = "UPDATE_CONFIG",
    RESET = "RESET",
    SET_CSRF = "SET_CSRF",
    SET_NAV_PAGE = "SET_NAV_PAGE",
    CTF_SET_CHALLENGES = "CTF_SET_CHALLENGES",
    CTF_UPDATE_CHALLENGE = "CTF_UPDATE_CHALLENGE",
    ADMIN_SET_CHALLENGES = "ADMIN_SET_CHALLENGES",
    ADMIN_ADD_CHALLENGE = "ADMIN_ADD_CHALLENGE",
    ADMIN_UPDATE_CHALLENGE = "ADMIN_UPDATE_CHALLENGE",
    ADMIN_DELETE_CHALLENGE = "ADMIN_DELETE_CHALLENGE",
    SET_CHALLENGE_FILES = "SET_CHALLENGE_FILES",
    SET_USER = "SET_USER",
    ADD_POPUP = "ADD_POPUP",
    REMOVE_POPUP = "REMOVE_POPUP",
    CLEAR_POPUPS = "CLEAR_POPUPS",
    START_REQUEST = "START_REQUEST",
    FINISH_REQUEST = "FINISH_REQUEST",
    OPEN_MODAL = "OPEN_MODAL",
    CLOSE_MODAL = "CLOSE_MODAL"
}

/*
 * action creators
 */

export function updateConfig(config: Config): Action<Config> {
    return { type: ActionId.UPDATE_CONFIG, value: config }
}

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

export function ctfUpdateChallenge(challenge: ChallengeData): Action<ChallengeData> {
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

export function setChallengeFiles(challengeId: number, files: FileDescriptor[]): Action<{ id: number, files: FileDescriptor[] }> {
    return {
        type: ActionId.SET_CHALLENGE_FILES,
        value: { id: challengeId, files: files }
    };
}

export function setUser(user: User | null): Action<User | null> {
    return { type: ActionId.SET_USER, value: user };
}

export function addPopup(popup: Popup): Action<Popup> {
    return { type: ActionId.ADD_POPUP, value: popup };
}

export function removePopup(location: PopupLocation): Action<PopupLocation> {
    return { type: ActionId.REMOVE_POPUP, value: location };
}

export function clearPopups(): Action<undefined> {
    return { type: ActionId.CLEAR_POPUPS, value: undefined };
}

export function startRequest(requestName: string): Action<string> {
    return { type: ActionId.START_REQUEST, value: requestName };
}

export function finishRequest(requestName: string): Action<string> {
    return { type: ActionId.FINISH_REQUEST, value: requestName };
}

export function openModal(id: ModalID): Action<ModalKey> {
    return { type: ActionId.OPEN_MODAL, value: { id: id, index: undefined } };
}

export function openModalKey(id: ModalID, index: number | string): Action<ModalKey> {
    return { type: ActionId.OPEN_MODAL, value: { id: id, index: index } };
}

export function closeModal(): Action<undefined> {
    return { type: ActionId.CLOSE_MODAL, value: undefined };
}
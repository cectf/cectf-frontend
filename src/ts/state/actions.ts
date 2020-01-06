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

/**
 * Updates the app configuration
 * 
 * @param config the new configuration
 */
export function updateConfig(config: Config): Action<Config> {
    return { type: ActionId.UPDATE_CONFIG, value: config }
}

/**
 * Resets the entire state of the app.
 * Redux will be reset to it's default state.
 */
export function reset(): Action<null> {
    return { type: ActionId.RESET, value: null };
}

/**
 * Sets the CSRF token
 * 
 * @param csrfToken the new CSRF token
 */
export function setCsrf(csrfToken: string): Action<string> {
    return { type: ActionId.SET_CSRF, value: csrfToken }
}

/**
 * Navigates to a new page
 * 
 * @param navPage the new NavPage
 */
export function setNavPage(navPage: NavPage): Action<NavPage> {
    return { type: ActionId.SET_NAV_PAGE, value: navPage }
}

/**
 * Sets the CTF challenges being rendered
 * 
 * @param challenges the new array of challenges
 */
export function ctfSetChallenges(challenges: Challenge[]): Action<Challenge[]> {
    return { type: ActionId.CTF_SET_CHALLENGES, value: challenges }
}

/**
 * Updates the data for a specific challenge. The challenge ID will be used to identify the challenge.
 * 
 * @param challenge the new challenge data
 */
export function ctfUpdateChallenge(challenge: ChallengeData): Action<ChallengeData> {
    return { type: ActionId.CTF_UPDATE_CHALLENGE, value: challenge }
}

/**
 * Sets the CTF challenges being rendered in the admin view
 * 
 * @param challenges the new array of admin challenges
 */
export function adminSetChallenges(challenges: AdminChallenge[]): Action<AdminChallenge[]> {
    return { type: ActionId.ADMIN_SET_CHALLENGES, value: challenges }
}

/**
 * Adds a new challenge to the admin view
 * 
 * @param challenge the new admin challenge
 */
export function adminAddChallenge(challenge: AdminChallenge): Action<AdminChallenge> {
    return { type: ActionId.ADMIN_ADD_CHALLENGE, value: challenge }
}

/**
 * Updates a challenge in the admin view. The challenge ID will be used to identify the challenge.
 * 
 * @param challenge the new value for the admin challenge
 */
export function adminUpdateChallenge(challenge: AdminChallenge): Action<AdminChallenge> {
    return { type: ActionId.ADMIN_UPDATE_CHALLENGE, value: challenge }
}

/**
 * Deletes a challenge from the admin view.
 * 
 * @param challenge the challenge to delete
 */
export function adminDeleteChallenge(challenge: AdminChallenge): Action<AdminChallenge> {
    return { type: ActionId.ADMIN_DELETE_CHALLENGE, value: challenge }
}

/**
 * Sets the challenge files for a specific challenge.
 * 
 * @param challengeId the id of the challenge
 * @param files the array of file descriptors
 */
export function setChallengeFiles(challengeId: number, files: FileDescriptor[]): Action<{ id: number, files: FileDescriptor[] }> {
    return {
        type: ActionId.SET_CHALLENGE_FILES,
        value: { id: challengeId, files: files }
    };
}

/**
 * Sets the current user
 * 
 * @param user the current user
 */
export function setUser(user: User | null): Action<User | null> {
    return { type: ActionId.SET_USER, value: user };
}

/**
 * Adds a new popup, or overrides an old one if the location already contained a popup.
 * 
 * @param popup the new popup
 */
export function addPopup(popup: Popup): Action<Popup> {
    return { type: ActionId.ADD_POPUP, value: popup };
}

/**
 * Removes a popup from a location.
 * 
 * @param location the location to remove the popup from
 */
export function removePopup(location: PopupLocation): Action<PopupLocation> {
    return { type: ActionId.REMOVE_POPUP, value: location };
}

/**
 * Removes all popups from everywhere in the application.
 */
export function clearPopups(): Action<undefined> {
    return { type: ActionId.CLEAR_POPUPS, value: undefined };
}

/**
 * Records the start of an API request
 * 
 * @param requestName the name of the request (generally the URL)
 */
export function startRequest(requestName: string): Action<string> {
    return { type: ActionId.START_REQUEST, value: requestName };
}

/**
 * Records the termination of an API request
 * 
 * @param requestName the name of the request (generally the URL)
 */
export function finishRequest(requestName: string): Action<string> {
    return { type: ActionId.FINISH_REQUEST, value: requestName };
}

/**
 * Opens a modal
 * 
 * @param id the ID of the modal
 */
export function openModal(id: ModalID): Action<ModalKey> {
    return { type: ActionId.OPEN_MODAL, value: { id: id, index: undefined } };
}

/**
 * Opens a modal with a key index. 
 * 
 * @param id the ID of the modal
 * @param index the index of the modal
 */
export function openModalKey(id: ModalID, index: number | string): Action<ModalKey> {
    return { type: ActionId.OPEN_MODAL, value: { id: id, index: index } };
}

/**
 * Closes a modal
 */
export function closeModal(): Action<undefined> {
    return { type: ActionId.CLOSE_MODAL, value: undefined };
}
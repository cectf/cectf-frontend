import { Identifier } from "@babel/types";

/**
 * Definitions for common data types that are used in multiple places
 */

/** The server provided site configuration */
export interface Config {
  production: boolean;
}

/**
 * The default config value. Stored here rather than in reducers.ts
 */
export var DEFAULT_CONFIG: Config = {
  production: true
}

/**
 * A CTF challenge, as returned by the API.
 * This is only used for contestant users.
 */
export interface Challenge {
  id: number;
  title: string;
  category: string;
  author: string;
  body: string;
  solved: boolean;
}

/**
 * A wrapper for Challenge that includes data necessary to render the challenge on the page
 */
export interface ChallengeData {
  data: Challenge;
  open: boolean;
}

/**
 * A CTF challenge, as returned by the API.
 * This is only used for admin users.
 */
export interface AdminChallenge {
  id: number;
  title: string;
  category: string;
  author: string;
  body: string;
  solution: string;
  previousChallenge: number | null;
}

/**
 * A new CTF challenge, prior to creation.
 * This should be identical to AdminChallenge, but without an id.
 */
export interface NewAdminChallenge {
  title: string;
  category: string;
  author: string;
  body: string;
  solution: string;
  previousChallenge: number | null;
}

/**
 * Description of a challenge file.
 */
export interface FileDescriptor {
  name: string;
  url: string;
}

/**
 * A site user
 */
export interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

/**
 * Roles that a user can have. Right now there are only admin and contestant.
 */
export interface Role {
  name: string;
  description: string;
}

/**
 * The different pages in the app
 */
export enum NavPage {
  ABOUT = "ABOUT",
  CTF = "CTF",
  ADMIN = "ADMIN"
}

/**
 * Response codes for attempting to submit a challenge. These are defined in the server.
 */
export enum SubmissionStatus {
  INCORRECT = 0,
  CORRECT = 1,
  ALREADY_SOLVED = 2
}

/**
 * An attempted challenge submission, as returned by the API
 */
export interface Submission {
  status: SubmissionStatus;
  challenge?: Challenge;
}

/**
 * The different severities of popup
 */
export enum PopupLevel {
  ERROR = "error",
  INFO = "info"
}

/**
 * The different places that a popup can appear
 */
export enum PopupLocation {
  TOP_BAR = "TOP_BAR",
  SIGNUP = "SIGNUP",
  CHALLENGE_TILE = "CHALLENGE_TILE"
}

/**
 * A popup message.
 * These will appear when the result of an action needs to be communicated to the user.
 */
export interface Popup {
  level: PopupLevel;
  text: string;
  location: PopupLocation;
  /**
   * Some locations (like CHALLENGE_TILE) can have an arbitrary number of places for popups to appear.
   * The locationKey is used to filter the popup so that it will only appear in the desired sublocation.
   */
  locationKey?: any;
}

/**
 * The different modals.
 */
export enum ModalID {
  REGISTER = "register-modal",
  ADMIN_CHALLENGE = "admin-challenge-modal"
}

/**
 * A wrapper for ModalID
 */
export interface ModalKey {
  id: ModalID;
  index: number | string | undefined;
}

/**
 * The combined state of the app.
 * This is the state that redux works with.
 */
export interface State {
  config: Config;
  csrf: string;
  challenges: ChallengeData[];
  adminChallenges: AdminChallenge[];
  files: Map<number, FileDescriptor[]>;
  user: User | null;
  navPage: NavPage;
  popups: Map<PopupLocation, Popup>;
  activeRequests: string[];
  modal: ModalKey | null;
}
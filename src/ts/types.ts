import { Identifier } from "@babel/types";

export interface Config {
  production: boolean;
}

export var DEFAULT_CONFIG : Config = {
  production: true
}

export interface Challenge {
  id: number;
  title: string;
  category: string;
  author: string;
  body: string;
  solved: boolean;
}

export interface ChallengeData {
  data: Challenge;
  open: boolean;
}

export interface AdminChallenge {
  id: number;
  title: string;
  category: string;
  author: string;
  body: string;
  solution: string;
  previousChallenge: number | null;
}

export interface NewAdminChallenge {
  title: string;
  category: string;
  author: string;
  body: string;
  solution: string;
  previousChallenge: number | null;
}

export interface FileDescriptor {
  name: string;
  url: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

export interface Role {
  name: string;
  description: string;
}

export enum NavPage {
  ABOUT = "ABOUT",
  CTF = "CTF",
  ADMIN = "ADMIN"
}

export enum SubmissionStatus {
  INCORRECT = 0,
  CORRECT = 1,
  ALREADY_SOLVED = 2
}

export interface Submission {
  status: SubmissionStatus;
  challenge?: Challenge;
}


export enum PopupLevel {
  ERROR = "error",
  INFO = "info"
}

export enum PopupLocation {
  TOP_BAR = "TOP_BAR",
  SIGNUP = "SIGNUP",
  CHALLENGE_TILE = "CHALLENGE_TILE"
}

export interface Popup {
  key: number;
  level: PopupLevel;
  text: string;
  location: PopupLocation;
  locationKey?: any;
}

export enum ModalID {
  REGISTER = "register-modal",
  CHALLENGE = "challenge-modal",
  ADMIN_CHALLENGE = "admin-challenge-modal"
}

export interface ModalKey {
  id: ModalID;
  index: number | string | undefined;
}

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
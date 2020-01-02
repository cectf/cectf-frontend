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

export interface AdminChallenge {
  id: number;
  title: string;
  category: string;
  author: string;
  body: string;
  solution: string;
  previousChallenge: number | null;
  files: FileDescriptor[] | undefined;
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

export interface Popup {
  key: number;
  date: Date;
  level: PopupLevel;
  text: string;
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
  challenges: Challenge[];
  adminChallenges: AdminChallenge[];
  user: User | null;
  navPage: NavPage;
  popups: Popup[];
  activeRequests: string[];
  modal: ModalKey | null;
}
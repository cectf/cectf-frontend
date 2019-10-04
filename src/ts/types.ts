export interface Challenge {
  id: number;
  title: string;
  category: string;
  body: string;
  hint: string;
  solution: string;
  hinted: boolean;
  solved: boolean;
}

export interface AdminChallenge {
  id: number;
  title: string;
  category: string;
  body: string;
  hint: string;
  solution: string;
}

export interface NewAdminChallenge {
  title: string;
  category: string;
  body: string;
  hint: string;
  solution: string;
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
  ABOUT,
  CTF,
  ADMIN
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

export interface State {
  csrf: string;
  challenges: Challenge[];
  adminChallenges: AdminChallenge[];
  user: User | null;
  navPage: NavPage;
}
import api from "api";
import state from "state";
import userService from "services/user.service";
import challengesService from "services/challenges.service";
import { NavPage } from "types";

async function login(username: string, password: string) {
  return api.auth.login(username, password).then(() => {
    userService.updateCurrentUser();
    challengesService.updateChallenges();
  });
}

async function logout() {
  return api.auth.logout().then(() => {
    userService.reset();
    challengesService.reset();
    state.nav.nextState(NavPage.ABOUT);
  });
}

async function register(email: string, username: string, password: string) {
  return api.auth.register(email, username, password).then(() => {
    userService.updateCurrentUser();
    challengesService.updateChallenges();
  });
}

export default { login, logout, register };

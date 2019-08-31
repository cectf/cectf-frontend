import api from "api";
import state from "state";
import userService from "services/user.service";
import challengesService from "services/challenges.service";
import { NavPage } from "types";

async function login(username: string, password: string): Promise<Response> {
  return api.auth.login(username, password).then(async response => {
    if (!response.ok) {
      return Promise.reject("Unauthorized");
    }
    return response.json().then(json => {
      userService.updateCurrentUser();
      challengesService.updateChallenges();
      return json;
    });
  });
}

async function logout(): Promise<void> {
  return api.auth.logout().then(() => {
    userService.updateCurrentUser();
    challengesService.updateChallenges();
    state.nav.nextState(NavPage.ABOUT);
  });
}

async function register(
  email: string,
  username: string,
  password: string
): Promise<Response> {
  console.log("Registering %s %s %s", email, username, password);
  return api.auth.register(email, username, password).then(async response => {
    if (!response.ok) {
      return Promise.reject("Unauthorized");
    }
    return response.json().then(json => {
      userService.updateCurrentUser();
      challengesService.updateChallenges();
      return json;
    });
  });
}

export default { login, logout, register };

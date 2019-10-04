import api from "api";
import { store , reset } from "state";
import userService from "services/user.service";
import challengesService from "services/challenges.service";
import challengesAdminService from "services/challengesAdmin.service";
import csrfService from "services/csrf.service";

async function login(username: string, password: string) {
  return api.auth.login(username, password).then(() => {
    userService.updateCurrentUser();
    challengesService.updateChallenges();
    challengesAdminService.updateChallenges();
  });
}

async function logout() {
  return api.auth.logout().then(() => {
    store.dispatch(reset());
    csrfService.refreshCsrf();
  });
}

async function register(email: string, username: string, password: string) {
  return api.auth.register(email, username, password).then(() => {
    userService.updateCurrentUser();
    challengesService.updateChallenges();
  });
}

export default { login, logout, register };

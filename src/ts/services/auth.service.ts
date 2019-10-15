import api from "@cectf/api";
import { store, reset } from "@cectf/state";
import userService from "@cectf/services/user.service";
import csrfService from "@cectf/services/csrf.service";
import popupService from "@cectf/services/popup.service";

async function login(username: string, password: string) {
  return api.auth.login(username, password)
    .then(() => {
      userService.updateCurrentUser();
    }).catch(error => {
      popupService.error(error);
    });
}

async function logout(): Promise<void> {
  return api.auth.logout().then(() => {
    store.dispatch(reset());
    csrfService.refreshCsrf();
  });
}

async function register(email: string, username: string, password: string) {
  return api.auth.register(email, username, password).then(() => {
    userService.updateCurrentUser();
  }).catch(error => {
    popupService.error(error);
  });
}

export default { login, logout, register };

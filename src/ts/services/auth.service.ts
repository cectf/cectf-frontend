import * as log from 'loglevel';
import api from "@cectf/api";
import userService from "@cectf/services/user.service";
import popupService from "@cectf/services/popup.service";
import resetService from "@cectf/services/reset.service";
import { PopupLocation } from '@cectf/types';

async function login(username: string, password: string) {
  log.info("Attempting login for user %s", username);
  return api.auth.login(username, password)
    .then(() => {
      log.debug("Login succeeded for user %s", username);
      userService.updateCurrentUser();
    }).catch(error => {
      log.debug("Login failed: %s", error);
      popupService.error(PopupLocation.TOP_BAR, error);
    });
}

async function logout(): Promise<void> {
  log.info("Logging out");
  return api.auth.logout().then(() => {
    return resetService.resetApp();
  }).catch(error => {
    log.debug("Logout failed: %s", error);
    popupService.error(PopupLocation.TOP_BAR, error);
  });
}

async function register(email: string, username: string, password: string): Promise<void> {
  log.info("Registering %s [%s]", username, email);
  return api.auth.register(email, username, password).then(() => {
    log.debug("Registration succeeded");
    return userService.updateCurrentUser();
  }).catch(error => {
    log.debug("Registration failed: %s", error);
    popupService.error(PopupLocation.SIGNUP, error);
  });
}

export default { login, logout, register };

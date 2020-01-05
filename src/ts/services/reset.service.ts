import * as log from 'loglevel';
import api from "@cectf/api";
import configService from "@cectf/services/config.service";
import csrfService from "@cectf/services/csrf.service";
import popupService from "@cectf/services/popup.service";
import { store, reset } from "@cectf/state"
import { PopupLocation } from '@cectf/types';

/**
 * Resets the redux store and fetches the configuration and the CSRF token
 */
const resetApp = async function (): Promise<void> {
  log.info("Resetting the application state");
  store.dispatch(reset());
  return configService.updateConfig()
    .then(() => {
      return csrfService.refreshCsrf()
    })
    .catch((error) => {
      popupService.error(PopupLocation.TOP_BAR, "Something went wrong while resetting the application: " + error)
    });
}

/**
 * Resets the application's database and calls resetApp().
 * The database will only be wiped when running in development mode.
 */
const resetDatabase = async function (): Promise<void> {
  log.info("Resetting the application database");
  return api.reset.resetDatabase()
    .then(() => {
      return resetApp()
        .then(() => {
          popupService.info(PopupLocation.TOP_BAR, "Database reset successfully!");
        });
    })
    .catch((error) => {
      popupService.error(PopupLocation.TOP_BAR, "Something went wrong while resetting the database: " + error)
    });;
};

export default { resetApp, resetDatabase };

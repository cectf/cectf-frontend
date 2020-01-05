import * as log from 'loglevel';
import api from "@cectf/api";
import * as state from "@cectf/state";
import popupService from "@cectf/services/popup.service";
import { PopupLocation } from '@cectf/types';

async function updateConfig() {
  log.info("Updating app configuration");
  return api.config.getConfig()
    .then(config => {
      if (!config.production) {
        log.setLevel("debug");
        log.debug("Environment is not production, setting log level to debug");
      } else {
        log.setLevel("warn");
      }
      state.store.dispatch(state.updateConfig(config))
    }).catch(error => {
      popupService.error(PopupLocation.TOP_BAR, error);
    });
}

export default { updateConfig };

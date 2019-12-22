import * as log from 'loglevel';
import api from "@cectf/api";
import { store, setUser } from "@cectf/state";

const updateCurrentUser = async function (): Promise<void> {
  log.info("Updating current user");
  return api.user.getCurrentUser().then(user => {
    store.dispatch(setUser(user));
  });
};

export default { updateCurrentUser };

import api from "@cectf/api";
import { store, setUser } from "@cectf/state";

const updateCurrentUser = async function (): Promise<void> {
  return api.user.getCurrentUser().then(user => {
    store.dispatch(setUser(user));
  });
};

export default { updateCurrentUser };

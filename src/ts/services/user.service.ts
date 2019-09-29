import api from "api";
import { store } from "state";
import { setUser } from "state/actions";

const updateCurrentUser = async function (): Promise<void> {
  return api.user.getCurrentUser().then(user => {
    store.dispatch(setUser(user));
  });
};

export default { updateCurrentUser };

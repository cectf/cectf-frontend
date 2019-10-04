import api from "api";
import { store, setUser } from "state";

const updateCurrentUser = async function (): Promise<void> {
  return api.user.getCurrentUser().then(user => {
    store.dispatch(setUser(user));
  });
};

export default { updateCurrentUser };

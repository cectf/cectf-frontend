import api from "api/user.api";
import state from "state";

const updateCurrentUser = async function(): Promise<void> {
  return api.getCurrentUser().then(user => {
    state.user.nextState(user);
  });
};

export default { updateCurrentUser };

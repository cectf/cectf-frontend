import api from "api";
import state from "state";

const updateCurrentUser = async function(): Promise<void> {
  return api.user.getCurrentUser().then(user => {
    state.user.nextState(user);
  });
};
const reset = async function() {
  state.user.nextState(null);
};

export default { updateCurrentUser, reset };

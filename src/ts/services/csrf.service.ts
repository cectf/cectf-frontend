import api from "api";
import state from "state";

const refreshCsrf = async function() {
  return api.csrf
    .getCsrf()
    .then(csrf_token => state.csrf.nextState(csrf_token));
};

export default { refreshCsrf };

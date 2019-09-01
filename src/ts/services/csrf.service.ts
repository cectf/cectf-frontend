import api from "api";
import state from "state";

const refreshCsrf = async function() {
  return api.csrf
    .getCsrf()
    .then(response => response.json())
    .then(json => state.csrf.nextState(json.csrf_token));
};

export default { refreshCsrf };

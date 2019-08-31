import api from "api";
import state from "state";

const getCsrf = async function() {
  return api.csrf
    .getCsrf()
    .then(response => response.json())
    .then(json => state.csrf.nextState(json));
};

export default { getCsrf };

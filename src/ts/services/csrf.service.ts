import api from "api";
import {store} from "state";
import {setCsrf} from "state/actions"

const refreshCsrf = async function() {
  return api.csrf
    .getCsrf()
    .then(csrf_token => store.dispatch(setCsrf(csrf_token)));
};

export default { refreshCsrf };

import api from "api";
import { store , setCsrf } from "state"

const refreshCsrf = async function () {
  return api.csrf
    .getCsrf()
    .then(csrf_token => store.dispatch(setCsrf(csrf_token)));
};

export default { refreshCsrf };

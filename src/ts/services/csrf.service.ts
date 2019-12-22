import * as log from 'loglevel';
import api from "@cectf/api";
import { store , setCsrf } from "@cectf/state"

const refreshCsrf = async function () {
  return api.csrf
    .getCsrf()
    .then(csrf_token => store.dispatch(setCsrf(csrf_token)))
    .then(() => {});
};

export default { refreshCsrf };

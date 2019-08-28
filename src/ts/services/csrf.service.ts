import { get } from "api";
import * as State from "state";

export const getCsrf = async function() {
  return get("/api/login/csrf")
    .then(response => response.json())
    .then(json => State.csrf.nextState(json));
};

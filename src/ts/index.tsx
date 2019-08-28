import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppRoot } from "components/AppRoot";
import * as challengesService from "services/challenges.service";
import * as csrfService from "services/csrf.service";
import * as State from "state";

let userId = 1;

export let appRoot = <AppRoot userId={userId} />;

csrfService
  .getCsrf()
  .then(() => {
    console.log("Loaded the CSRF!");
    console.log(State.csrf.state);
  })
  .then(() => {
    ReactDOM.render(appRoot, document.getElementById("body"));
    challengesService.getChallenges(userId);
  });

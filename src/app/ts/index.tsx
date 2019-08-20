import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppRoot } from "app/components/AppRoot";
import * as challengesService from "app/services/challenges.service";

let userId = 1;

export let appRoot = <AppRoot userId={userId} />;

ReactDOM.render(appRoot, document.getElementById("body"));
challengesService.getChallenges(userId);

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactModal from "react-modal";
import AppRoot from "components/AppRoot";
import service from "services";

ReactModal.setAppElement("#body");

export let appRoot = <AppRoot />;

service.csrf.refreshCsrf().then(() => {
  service.user.updateCurrentUser();
  service.challenges.updateChallenges();
  service.challengesAdmin.updateChallenges();
  ReactDOM.render(appRoot, document.getElementById("body"));
});

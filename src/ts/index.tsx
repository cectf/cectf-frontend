import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactModal from "react-modal";
import { Provider } from 'react-redux';
import AppRoot from "components/AppRoot";
import service from "services";
import {store} from "state";

ReactModal.setAppElement("#body");

service.csrf.refreshCsrf().then(() => {
  service.user.updateCurrentUser();
  service.challenges.updateChallenges();
  service.challengesAdmin.updateChallenges();
  ReactDOM.render(
  <Provider store={store}><AppRoot /></Provider>
  , document.getElementById("body"));
});

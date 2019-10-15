import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactModal from "react-modal";
import { Provider } from 'react-redux';
import AppRoot from "@cectf/components/AppRoot"
//import AppRoot from "@cectf/components/AppRoot";
import service from "@cectf/services";
import { store } from "@cectf/state";
import "@styles/app.scss";

ReactModal.setAppElement("#body");

service.csrf.refreshCsrf().then(() => {
  service.user.updateCurrentUser();
});

ReactDOM.render(
  <Provider store={store}><AppRoot /></Provider>,
  document.getElementById("body"));
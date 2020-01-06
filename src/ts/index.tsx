import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactModal from "react-modal";
import { Provider } from 'react-redux';
import AppRoot from "@cectf/components/AppRoot"
import service from "@cectf/services";
import { store } from "@cectf/state";
import "@styles/appRoot.scss";

ReactModal.setAppElement("#root");

service.reset.resetApp().then(() => {
  service.user.updateCurrentUser();
});

ReactDOM.render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  document.getElementById("root"));
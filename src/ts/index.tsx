import * as React from "react";
import * as ReactDOM from "react-dom";
import AppRoot from "components/AppRoot";
import service from "services";

export let appRoot = <AppRoot />;

service.csrf.getCsrf().then(() => {
  ReactDOM.render(appRoot, document.getElementById("body"));
});

import * as React from "react";
import AppContentContainer from "containers/AppContentContainer";
import UserBarContainer from "containers/UserBarContainer";
import NavBarContainer from "containers/NavBarContainer";
import StateDisplayContainer from "containers/StateDisplayContainer";

export default class AppRoot extends React.Component<{}, {}> {
  render() {
    return (
      <div id="app" className="app">
        <UserBarContainer />
        <NavBarContainer />
        <AppContentContainer />
        <StateDisplayContainer />
      </div>
    );
  }
}

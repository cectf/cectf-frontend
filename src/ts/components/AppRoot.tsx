import * as React from "react";
import AppContentContainer from "@cectf/containers/AppContentContainer";
import UserBarContainer from "@cectf/containers/UserBarContainer";
import NavBarContainer from "@cectf/containers/NavBarContainer";
import PopupsContainer from "@cectf/containers/PopupsContainer";
import StateDisplayContainer from "@cectf/containers/StateDisplayContainer";

export default class AppRoot extends React.Component<{}, {}> {
  render() {
    return (
      <div id="app" className="app">
        <UserBarContainer />
        <NavBarContainer />
        <PopupsContainer />
        <AppContentContainer />
        <StateDisplayContainer />
      </div>
    );
  }
}

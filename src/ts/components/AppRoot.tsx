import * as React from "react";
import AppContentContainer from "@cectf/components/content/AppContentContainer";
import UserBarContainer from "@cectf/components/userBar/UserBarContainer";
import NavBarContainer from "@cectf/components/navBar/NavBarContainer";
import PopupsContainer from "@cectf/components/popups/PopupsContainer";
import StateDisplayContainer from "@cectf/components/StateDisplayContainer";

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

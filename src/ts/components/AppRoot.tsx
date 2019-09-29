import * as React from "react";
import AppContent from "components/AppContent";
import UserBarContainer from "containers/UserBarContainer";
import NavBarContainer from "containers/NavBarContainer";
import StateDisplay from "components/StateDisplay";

export default class AppRoot extends React.Component<{}, {}> {
  render() {
    return (
      <div id="app" className="app">
        <UserBarContainer />
        <NavBarContainer />
        <AppContent />
        <StateDisplay />
      </div>
    );
  }
}

import * as React from "react";
import AppContent from "components/AppContent";
import UserBar from "components/UserBar";
import NavBar from "components/NavBar";
import StateDisplay from "components/StateDisplay";

export default class AppRoot extends React.Component<{}, {}> {
  render() {
    return (
      <div id="app" className="app">
        <UserBar />
        <NavBar />
        <AppContent />
        <StateDisplay />
      </div>
    );
  }
}

import * as React from "react";
import ChallengesContainer from "containers/ChallengesContainer";
import Admin from "components/admin/Admin";
import About from "components/About";
import { NavPage } from "types";

interface AppContentProps {
  navPage: NavPage;
}
interface AppContentState { }

export default class AppContent extends React.Component<
  AppContentProps,
  AppContentState
  > {
  content = () => {
    switch (this.props.navPage) {
      case (NavPage.ABOUT):
        return <About />;
      case (NavPage.CTF):
        return <ChallengesContainer />;
      case (NavPage.ADMIN):
        return <Admin />;
    }
  }
  render() {
    return (
      <div id="app-content" className="app__content">
        {this.content()}
      </div>
    );
  }
}

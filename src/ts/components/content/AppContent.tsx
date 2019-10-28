import * as React from "react";
import ChallengesContainer from "@cectf/components/content/ctf/ChallengesContainer";
import Admin from "@cectf/components/content/admin/Admin";
import About from "@cectf/components/content/About";
import { NavPage } from "@cectf/types";
import * as styles from "@styles/content/appContent.scss";

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
      <div id="app-content"
        className={styles.appContent}
        data-content={this.props.navPage}>
        {this.content()}
      </div>
    );
  }
}

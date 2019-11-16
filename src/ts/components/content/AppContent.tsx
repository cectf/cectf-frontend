import * as React from "react";
import { connect } from "react-redux";
import Challenges from "@cectf/components/content/ctf/Challenges";
import Admin from "@cectf/components/content/admin/Admin";
import About from "@cectf/components/content/About";
import { State, NavPage } from "@cectf/types";
import * as styles from "@styles/content/appContent.scss";

interface AppContentProps {
  navPage: NavPage;
}
interface AppContentState { }

class AppContentComponent extends React.Component<
  AppContentProps,
  AppContentState
  > {
  content = () => {
    switch (this.props.navPage) {
      case (NavPage.ABOUT):
        return <About />;
      case (NavPage.CTF):
        return <Challenges />;
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

const mapStateToProps = (state: State) => {
  return { navPage: state.navPage };
}

const AppContent = connect(mapStateToProps)(AppContentComponent);
export default AppContent;
import * as React from "react";
import Title from "@cectf/components/Title"
import AppContentContainer from "@cectf/components/content/AppContentContainer";
import UserBarContainer from "@cectf/components/userBar/UserBarContainer";
import NavBarContainer from "@cectf/components/navBar/NavBarContainer";
import PopupsContainer from "@cectf/components/popups/PopupsContainer";
// import StateDisplayContainer from "@cectf/components/StateDisplayContainer";
import Footer from "@cectf/components/Footer";
import * as styles from "@styles/appRoot.scss";

export default class AppRoot extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.background}>
        <div id="app" className={styles.appRoot}>
          <Title />
          <UserBarContainer />
          <PopupsContainer />
          <NavBarContainer />
          <AppContentContainer />
          <Footer />
        </div>
      </div>
    );
    // <StateDisplayContainer />
  }
}

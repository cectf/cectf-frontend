import * as React from "react";
import Title from "@cectf/components/Title"
import AppContent from "@cectf/components/content/AppContent";
import UserBar from "@cectf/components/userBar/UserBar";
import Popups from "@cectf/components/popups/Popups";
import NavBar from "@cectf/components/navBar/NavBar";
import StateDisplay from "@cectf/components/StateDisplay";
import Footer from "@cectf/components/Footer";
import * as styles from "@styles/appRoot.scss";

export default class AppRoot extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.background}>
        <div id="app" className={styles.appRoot}>
          <Title />
          <UserBar />
          <Popups />
          <NavBar />
          <AppContent />
          <Footer />
          <StateDisplay />
        </div>
      </div>
    );
    
  }
}

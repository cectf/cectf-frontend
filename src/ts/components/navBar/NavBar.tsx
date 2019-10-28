import * as React from "react";
import { NavPage } from "@cectf/types";
import NavTab from "@cectf/components/navBar/NavTab";
import * as styles from "@styles/navBar/navBar.scss";

interface NavBarProps {
  navPages: NavPage[];
  navPage: NavPage;
  switchTo: (navPage: NavPage) => () => void;
}
interface NavBarState { }

export default class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
  }
  render() {
    return (
      <div id="nav-bar"
        className={styles.navBar}>
        {this.props.navPages.map(navPage => (
          <NavTab
            key={navPage}
            page={navPage}
            isActive={this.props.navPage === navPage}
            switch={this.props.switchTo(navPage)} />
        ))}
      </div>
    );
  }
}
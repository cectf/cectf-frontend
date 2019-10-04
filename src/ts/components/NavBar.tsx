import * as React from "react";
import { NavPage } from "types";
import NavTab from "components/NavTab";

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
      <div id="nav-bar">
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
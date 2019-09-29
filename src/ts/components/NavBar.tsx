import * as React from "react";
import { NavPage } from "types";
import state from "state";
import NavTab from "components/NavTab";

interface NavBarProps {
  navPages: NavPage[];
}
interface NavBarState {}

export default class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
  }
  render() {
    return (
      <div id="nav-bar">
        {this.props.navPages.map(navPage => (
          <NavTab page={navPage} />
        ))}
      </div>
    );
  }
}

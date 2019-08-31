import * as React from "react";
import { Role, NavPage } from "types";
import state from "state";
import NavTab from "components/NavTab";

interface NavBarProps {}
interface NavBarState {
  roles: Role[];
}

export default class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
    this.state = { roles: [] };
    this.getNavPages = this.getNavPages.bind(this);
  }
  componentDidMount() {
    state.user.addListener(user => {
      if (user) {
        this.setState({ roles: user.roles });
      } else {
        this.setState({ roles: [] });
      }
    });
  }
  getNavPages(): NavPage[] {
    var roles = this.state.roles;
    var navPages: NavPage[] = [NavPage.ABOUT];
    for (var i in roles) {
      if (roles[i].name === "contestant") {
        if (!(NavPage.CTF in navPages)) {
          navPages.push(NavPage.CTF);
        }
      }
      if (roles[i].name === "admin") {
        if (!(NavPage.ADMIN in navPages)) {
          navPages.push(NavPage.ADMIN);
        }
      }
    }
    return navPages;
  }
  render() {
    return (
      <div id="nav-bar">
        {this.getNavPages().map(navPage => (
          <NavTab page={navPage} />
        ))}
      </div>
    );
  }
}

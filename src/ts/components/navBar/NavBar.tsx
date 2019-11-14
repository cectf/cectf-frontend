import * as React from "react";
import { connect } from "react-redux";
import { setNavPage } from "@cectf/state"
import { State, NavPage } from "@cectf/types";
import NavTab from "@cectf/components/navBar/NavTab";
import * as styles from "@styles/navBar/navBar.scss";

interface NavBarProps {
  navPages: NavPage[];
  navPage: NavPage;
  switchTo: (navPage: NavPage) => () => void;
}
interface NavBarState { }

class NavBarComponent extends React.Component<NavBarProps, NavBarState> {
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

const mapStateToProps = (state: State) => {
  var navPages: NavPage[] = [NavPage.ABOUT];
  if (state.user) {
    for (var i in state.user.roles) {
      if (state.user.roles[i].name === "contestant") {
        if (!(NavPage.CTF in navPages)) {
          navPages.push(NavPage.CTF);
        }
      }
      if (state.user.roles[i].name === "admin") {
        if (!(NavPage.ADMIN in navPages)) {
          navPages.push(NavPage.ADMIN);
        }
      }
    }
  }
  return { navPages: navPages, navPage: state.navPage };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    switchTo: (navPage: NavPage) => {
      return () => { dispatch(setNavPage(navPage)); };
    }
  };
}


const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
export default NavBar;
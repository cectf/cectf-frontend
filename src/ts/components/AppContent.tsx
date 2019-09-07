import * as React from "react";
import Challenges from "components/ctf/Challenges";
import Admin from "components/admin/Admin";
import About from "components/About";
import state from "state";
import { NavPage } from "types";

interface AppContentProps {}
interface AppContentState {
  navPage: NavPage;
}

export default class AppContent extends React.Component<
  AppContentProps,
  AppContentState
> {
  constructor(props: AppContentProps) {
    super(props);
    this.state = { navPage: state.nav.state };
  }
  componentDidMount() {
    state.nav.addListener(nextState => {
      this.setState({ navPage: nextState });
    });
  }
  render() {
    var content: JSX.Element | null = null;
    if (this.state.navPage === NavPage.ABOUT) {
      content = <About />;
    }
    if (this.state.navPage === NavPage.CTF) {
      content = <Challenges />;
    }
    if (this.state.navPage === NavPage.ADMIN) {
      content = <Admin />;
    }
    return (
      <div id="app-content" className="app__content">
        {content}
      </div>
    );
  }
}

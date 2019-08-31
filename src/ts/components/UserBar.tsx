import * as React from "react";
import service from "services";
import LoginForm from "components/LoginForm";
import RegisterForm from "components/RegisterForm";
import { User } from "types";
import state from "state";

interface UserBarProps {}
interface UserBarState {
  user: User | null;
}

export default class UserBar extends React.Component<
  UserBarProps,
  UserBarState
> {
  constructor(props: UserBarProps) {
    super(props);
    this.state = { user: null };
    this.onLogout = this.onLogout.bind(this);
  }
  componentDidMount() {
    state.user.addListener(user => {
      this.setState({ user: user });
    });
  }
  onLogout(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    service.auth.logout();
  }

  render() {
    if (this.state.user) {
      return (
        <div id="userBar">
          Welcome, user {this.state.user.username}!
          <div id="logout">
            <a href="/" onClick={this.onLogout}>
              Log out
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div id="userBar">
          <LoginForm />
          <RegisterForm />
        </div>
      );
    }
  }
}

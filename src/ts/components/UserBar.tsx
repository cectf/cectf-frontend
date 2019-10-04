import * as React from "react";
import service from "services";
import LoginForm from "components/LoginForm";
import RegisterForm from "components/RegisterForm";
import { User } from "types";

interface UserBarProps {
  user?: User;
}
interface UserBarState {}

export default class UserBar extends React.Component<
  UserBarProps,
  UserBarState
> {
  constructor(props: UserBarProps) {
    super(props);
  }
  onLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    service.auth.logout();
  }

  render() {
    if (this.props.user) {
      return (
        <div id="userBar">
          Welcome, user {this.props.user.username}!
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

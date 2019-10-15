import * as React from "react";
import service from "@cectf/services";
import LoginForm from "@cectf/components/userBar/LoginForm";
import RegisterForm from "@cectf/components/userBar/RegisterForm";
import { User } from "@cectf/types";

interface UserBarProps {
  user?: User;
}
interface UserBarState { }

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
        <div id="user-bar"
          className="user-bar user-bar--logged-in"
          data-logged-in={true}
          data-username={this.props.user.username}>
          <div id="user-bar__welcome"
            className="user-bar__welcome">
            Welcome, user {this.props.user.username}!
          </div>
          <div id="user-bar__logout"
            className="user-bar__logout">
            <a id="logout"
              href="/" onClick={this.onLogout}>
              Log out
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div id="user-bar"
          className="user-bar user-bar--logged-out"
          data-logged-in={false}>
          <LoginForm />
          <RegisterForm />
        </div>
      );
    }
  }
}

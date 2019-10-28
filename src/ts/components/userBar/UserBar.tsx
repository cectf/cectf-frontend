import * as React from "react";
import service from "@cectf/services";
import LoginForm from "@cectf/components/userBar/LoginForm";
import RegisterForm from "@cectf/components/userBar/RegisterForm";
import { User } from "@cectf/types";
import * as styles from "@styles/userBar/userBar.scss";

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
          className={styles.userBarLoggedIn}
          data-logged-in={true}
          data-username={this.props.user.username}>
          <div id="user-bar__welcome"
            className={styles.userBarWelcome}>
            Welcome, user {this.props.user.username}!
          </div>
          <div id="user-bar__logout"
            className={styles.userBarLogout}>
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
          className={styles.userBarLoggedOut}
          data-logged-in={false}>
          <LoginForm />
          <RegisterForm />
        </div>
      );
    }
  }
}

import * as React from "react";
import service from "@cectf/services";
import * as styles from "@styles/userBar/loginForm.scss";

interface LoginProps { }
interface LoginState {
  username: string;
  password: string;
}

export default class LoginForm extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange_username = this.onChange_username.bind(this);
    this.onChange_password = this.onChange_password.bind(this);
  }

  onSubmit(event: React.FormEvent) {
    event.preventDefault();
    event.stopPropagation();
    service.auth.login(this.state.username, this.state.password);
  }

  onChange_username(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: event.target.value });
  }
  onChange_password(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div id="login-form"
        className={styles.loginForm}>
        <form name="login-form"
          onSubmit={this.onSubmit} >
          <table>
            <tbody>
              <tr>
                <td>
                  <span className={styles.loginFormUsername}>
                    <label htmlFor="username"> Username: </label>
                  </span>
                </td>
                <td>
                  <input id="username"
                    type="text"
                    onChange={this.onChange_username} />
                </td>
              </tr>
              <tr>
                <td>
                  <span className={styles.loginFormPassword}>
                    <label htmlFor="password"> Password: </label>
                  </span>
                </td>
                <td>
                  <input id="password"
                    type="password"
                    onChange={this.onChange_password}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button id="login"
                    className={styles.loginFormSubmit}
                    type="submit">
                    Log in
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

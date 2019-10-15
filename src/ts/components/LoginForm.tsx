import * as React from "react";
import service from "@cectf/services";

interface LoginProps {}
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
      <form onSubmit={this.onSubmit} name="login_user_form">
        <input type="text" id="username" onChange={this.onChange_username} />
        <input
          type="password"
          id="password"
          onChange={this.onChange_password}
        />
        <button type="submit" id="login">
          Submit
        </button>
      </form>
    );
  }
}

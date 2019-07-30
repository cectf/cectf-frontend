import * as React from "react";
import { authenticationService } from "../services/authentication.service";

export interface LoginProps {}
export interface LoginState {
  username: string;
  password: string;
}

export class LoginForm extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange_username = this.onChange_username.bind(this);
    this.onChange_password = this.onChange_password.bind(this);

    localStorage.removeItem("token");
  }

  onSubmit(event: React.FormEvent) {
    console.log("SUBMITTING! ", this.state);
    authenticationService
      .login(this.state.username, this.state.password)
      .then(response => {
        console.log(response);
        console.log(location);
      });
    event.preventDefault();
    event.stopPropagation();
  }

  onChange_username(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: event.target.value });
  }
  onChange_password(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" id="username" onChange={this.onChange_username} />
        <input
          type="password"
          id="password"
          onChange={this.onChange_password}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

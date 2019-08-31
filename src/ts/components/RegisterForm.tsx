import * as React from "react";
import service from "services";
import * as Modal from "react-modal";

interface RegisterProps {}
interface RegisterState {
  modalOpen: boolean;
  email: string;
  username: string;
  password: string;
}

export default class RegisterForm extends React.Component<
  RegisterProps,
  RegisterState
> {
  constructor(props: RegisterProps) {
    super(props);

    this.state = {
      modalOpen: false,
      email: "",
      username: "",
      password: ""
    };

    this.onClick = this.onClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onChange_email = this.onChange_email.bind(this);
    this.onChange_username = this.onChange_username.bind(this);
    this.onChange_password = this.onChange_password.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ modalOpen: true });
  }
  onModalClose() {
    this.setState({ modalOpen: false });
  }

  onChange_email(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: event.target.value });
  }
  onChange_username(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: event.target.value });
  }
  onChange_password(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: event.target.value });
  }
  onSubmit(event: React.FormEvent) {
    event.preventDefault();
    event.stopPropagation();
    service.auth.register(
      this.state.email,
      this.state.username,
      this.state.password
    );
  }

  render() {
    return [
      <div className="register-pls">
        <a href="/" onClick={this.onClick}>
          Sign up!
        </a>
      </div>,
      <Modal isOpen={this.state.modalOpen} onRequestClose={this.onModalClose}>
        <div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              id="email"
              name="email"
              onChange={this.onChange_email}
            />
            <input
              type="text"
              id="username"
              name="username"
              onChange={this.onChange_username}
            />
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.onChange_password}
            />
            <button type="submit" id="submit">
              Submit
            </button>
          </form>
        </div>
        <button onClick={this.onModalClose}>Close</button>
      </Modal>
    ];
  }
}
